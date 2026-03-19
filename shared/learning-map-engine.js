// ════════════════════════════════════════════════════════════
// LEARNING MAP ENGINE — Generic, data-driven skill tree
// Generalized from langchain-learning/docs/learning-map.html
// ════════════════════════════════════════════════════════════
//
// Usage: load this script AFTER your data.js (which defines
// EXERCISES, MUTATIONS, LAYER_META) and call:
//   LearningMap.init({ storageKey, title, subtitle, layers })
//
// ════════════════════════════════════════════════════════════

const LearningMap = (() => {

  // ── State ──
  let config = {};
  let progress = {};  // { exerciseId: { completed: true, completedAt: ... } }
  let mode = 'complete'; // 'jourJ' | 'complete'
  let currentDetailEx = null;
  let svgReady = false;
  let shikiReady = null;

  // ── Color mappings ──
  const LAYER_COLORS = {
    basics:      { accent: '#34d399', accentBg: 'rgba(52, 211, 153, 0.06)', label: '#6ee7b7', bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.25)' },
    skills:      { accent: '#38bdf8', accentBg: 'rgba(56, 189, 248, 0.05)', label: '#7dd3fc', bg: 'rgba(56, 189, 248, 0.06)', border: 'rgba(56, 189, 248, 0.2)' },
    agents:      { accent: '#fb923c', accentBg: 'rgba(251, 146, 60, 0.05)', label: '#fdba74', bg: 'rgba(251, 146, 60, 0.06)', border: 'rgba(251, 146, 60, 0.2)' },
    triggers:    { accent: '#38bdf8', accentBg: 'rgba(56, 189, 248, 0.05)', label: '#7dd3fc', bg: 'rgba(56, 189, 248, 0.06)', border: 'rgba(56, 189, 248, 0.2)' },
    advanced:    { accent: '#fb923c', accentBg: 'rgba(251, 146, 60, 0.05)', label: '#fdba74', bg: 'rgba(251, 146, 60, 0.06)', border: 'rgba(251, 146, 60, 0.2)' },
    integration: { accent: '#38bdf8', accentBg: 'rgba(56, 189, 248, 0.05)', label: '#7dd3fc', bg: 'rgba(56, 189, 248, 0.06)', border: 'rgba(56, 189, 248, 0.2)' },
    ai:          { accent: '#fb923c', accentBg: 'rgba(251, 146, 60, 0.05)', label: '#fdba74', bg: 'rgba(251, 146, 60, 0.06)', border: 'rgba(251, 146, 60, 0.2)' },
  };

  // ── DOM refs ──
  let container, tooltip, detailPanel, detailContent, detailClose, legendEl, modeToggle;

  // ════════════════════════════════════════════════════════════
  // INIT
  // ════════════════════════════════════════════════════════════
  function init(cfg) {
    config = cfg;
    loadProgress();

    container = document.getElementById('treeContainer');
    tooltip = document.getElementById('tooltip');
    detailPanel = document.getElementById('detailPanel');
    detailContent = document.getElementById('detailContent');
    detailClose = document.getElementById('detailClose');
    legendEl = document.getElementById('legend');

    renderModeToggle();
    renderLegend();
    renderTree();
    bindGlobalEvents();

    // Draw SVG after first node animation
    const firstNode = container.querySelector('.node');
    function initSVG() {
      if (svgReady) return;
      svgReady = true;
      createSVG();
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createSVG, 150);
      });
    }
    if (firstNode) firstNode.addEventListener('animationend', initSVG, { once: true });
    setTimeout(initSVG, 800);

    // Preload Shiki if mutations exist
    if (typeof MUTATIONS !== 'undefined' && MUTATIONS.length > 0) {
      if (window.requestIdleCallback) requestIdleCallback(() => getShikiEngine());
    }
  }

  // ════════════════════════════════════════════════════════════
  // PROGRESS (localStorage)
  // ════════════════════════════════════════════════════════════
  function loadProgress() {
    try {
      const stored = localStorage.getItem(config.storageKey);
      if (stored) progress = JSON.parse(stored);
    } catch { /* ignore */ }
  }

  function saveProgress() {
    try { localStorage.setItem(config.storageKey, JSON.stringify(progress)); } catch { /* ignore */ }
  }

  function isCompleted(id) {
    return progress[id]?.completed === true;
  }

  function toggleCompleted(id) {
    if (isCompleted(id)) {
      delete progress[id];
    } else {
      progress[id] = { completed: true, completedAt: Date.now() };
    }
    saveProgress();
  }

  // ════════════════════════════════════════════════════════════
  // MODE TOGGLE
  // ════════════════════════════════════════════════════════════
  function renderModeToggle() {
    modeToggle = document.getElementById('modeToggle');
    if (!modeToggle) return;

    const jourJCount = EXERCISES.filter(e => e.jourJ).length;
    const totalCount = EXERCISES.length;

    modeToggle.innerHTML = `
      <button class="mode-btn ${mode === 'jourJ' ? 'mode-btn--active' : ''}" data-mode="jourJ">
        Jour J <span class="mode-badge mode-badge--jour-j">${jourJCount}</span>
      </button>
      <button class="mode-btn ${mode === 'complete' ? 'mode-btn--active' : ''}" data-mode="complete">
        Parcours complet <span class="mode-badge" style="background:rgba(255,255,255,0.06);color:var(--text-secondary);border:1px solid rgba(255,255,255,0.08)">${totalCount}</span>
      </button>
    `;

    modeToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mode]');
      if (!btn) return;
      mode = btn.dataset.mode;
      modeToggle.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('mode-btn--active'));
      btn.classList.add('mode-btn--active');
      applyModeFilter();
    });
  }

  function applyModeFilter() {
    container.querySelectorAll('.node').forEach(node => {
      const ex = EXERCISES.find(e => e.id === node.dataset.id);
      if (!ex) return;
      if (mode === 'jourJ' && !ex.jourJ) {
        node.classList.add('node--hidden');
      } else {
        node.classList.remove('node--hidden');
      }
    });

    // Hide empty layers
    container.querySelectorAll('.layer').forEach(layer => {
      const visibleNodes = layer.querySelectorAll('.node:not(.node--hidden)');
      layer.style.display = visibleNodes.length ? '' : 'none';
    });

    // Hide branches section if all hidden
    const branchSection = container.querySelector('.branches-section');
    if (branchSection) {
      const visibleBranch = branchSection.querySelectorAll('.node:not(.node--hidden)');
      branchSection.style.display = visibleBranch.length ? '' : 'none';
    }

    // Redraw SVG
    if (svgReady) {
      setTimeout(createSVG, 50);
    }
  }

  // ════════════════════════════════════════════════════════════
  // LEGEND
  // ════════════════════════════════════════════════════════════
  function renderLegend() {
    config.layers.forEach(layerId => {
      const meta = LAYER_META[layerId];
      if (!meta) return;
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.dataset.layer = layerId;
      item.innerHTML = `
        <div class="legend-swatch" style="background: ${meta.glowColor}"></div>
        ${meta.label}
        <div class="legend-tooltip">
          <div class="legend-tooltip-desc">${meta.tooltip}</div>
        </div>
      `;
      legendEl.appendChild(item);
    });

    const prereqItem = document.createElement('div');
    prereqItem.className = 'legend-item';
    prereqItem.innerHTML = `<div class="legend-swatch" style="background: rgba(255,255,255,0.3); width:28px; height:2px; border-radius:1px"></div> Prerequisite`;
    legendEl.appendChild(prereqItem);
  }

  // ════════════════════════════════════════════════════════════
  // NODE RENDERING
  // ════════════════════════════════════════════════════════════
  function createNodeEl(ex, animDelay) {
    const meta = LAYER_META[ex.layer];
    const completed = isCompleted(ex.id);
    const node = document.createElement('div');
    node.className = `node ${ex.done ? 'node--done' : 'node--future'} ${completed ? 'node--completed' : ''}`;
    node.dataset.id = ex.id;
    node.dataset.layer = ex.layer;
    node.style.setProperty('--glow-color', meta.glowColor);
    node.style.animationDelay = `${animDelay}s`;

    const statusClass = completed ? 'node-status--completed' : (ex.done ? 'node-status--done' : 'node-status--future');
    const jourJBadge = ex.jourJ ? '<span class="node-jour-j-badge">Jour J</span>' : '';

    node.innerHTML = `
      ${jourJBadge}
      <div class="node-header">
        <span class="node-number">${ex.id}</span>
        <span class="node-status ${statusClass}"></span>
      </div>
      <div class="node-title">${ex.title}</div>
      <div class="node-concepts">${ex.concepts}</div>
    `;

    node.addEventListener('mouseenter', (e) => showTooltip(e, ex));
    node.addEventListener('mouseleave', hideTooltip);
    node.addEventListener('click', () => showDetail(ex, meta));

    return node;
  }

  // ════════════════════════════════════════════════════════════
  // TREE RENDERING
  // ════════════════════════════════════════════════════════════
  function renderTree() {
    container.innerHTML = '';

    // Trunk layers
    const trunkLayers = config.layers.filter(l =>
      EXERCISES.some(e => e.section === 'trunk' && e.layer === l)
    );

    trunkLayers.forEach((layerId, layerIdx) => {
      const exercises = EXERCISES.filter(e => e.section === 'trunk' && e.layer === layerId);
      if (!exercises.length) return;
      const meta = LAYER_META[layerId];

      const layerEl = document.createElement('div');
      layerEl.className = `layer ${meta.className}`;

      const label = document.createElement('div');
      label.className = 'layer-label';
      label.innerHTML = `
        <span class="layer-label-name">${meta.label}</span>
        <span class="layer-tagline">${meta.tagline}</span>
        <span class="layer-builds-on">${meta.buildsOn}</span>
      `;
      layerEl.appendChild(label);

      const nodesContainer = document.createElement('div');
      nodesContainer.className = 'layer-nodes';

      exercises.forEach((ex, nodeIdx) => {
        nodesContainer.appendChild(createNodeEl(ex, layerIdx * 0.2 + nodeIdx * 0.1));
      });

      layerEl.appendChild(nodesContainer);
      container.appendChild(layerEl);
    });

    // Branches section
    const branchExercises = EXERCISES.filter(e => e.section === 'branches');
    if (branchExercises.length) {
      const section = document.createElement('div');
      section.className = 'branches-section';

      const sectionLabel = document.createElement('div');
      sectionLabel.className = 'branches-section-label';
      sectionLabel.textContent = 'Approfondissement';
      section.appendChild(sectionLabel);

      const grid = document.createElement('div');
      grid.className = 'branches-grid';
      grid.style.gridTemplateColumns = `repeat(${Math.min(branchExercises.length, 3)}, 1fr)`;

      branchExercises.forEach((ex, i) => {
        grid.appendChild(createNodeEl(ex, 0.8 + i * 0.1));
      });

      section.appendChild(grid);
      container.appendChild(section);
    }

    applyModeFilter();
  }

  // ════════════════════════════════════════════════════════════
  // SVG CONNECTIONS
  // ════════════════════════════════════════════════════════════
  function createSVG() {
    const old = container.querySelector('.connections-svg');
    if (old) old.remove();
    document.querySelectorAll('.morph-icon').forEach(el => el.remove());

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('connections-svg');
    const cw = container.scrollWidth, ch = container.scrollHeight;
    svg.setAttribute('width', cw);
    svg.setAttribute('height', ch);
    svg.setAttribute('viewBox', `0 0 ${cw} ${ch}`);
    container.prepend(svg);

    function getOffsetPos(el) {
      let x = 0, y = 0, cur = el;
      while (cur && cur !== container) {
        x += cur.offsetLeft;
        y += cur.offsetTop;
        cur = cur.offsetParent;
      }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight };
    }

    function getEdge(id, side) {
      const el = container.querySelector(`[data-id="${id}"]:not(.node--hidden)`);
      if (!el) return null;
      const { x, y, w, h } = getOffsetPos(el);
      switch (side) {
        case 'top':    return { x: x + w / 2, y };
        case 'bottom': return { x: x + w / 2, y: y + h };
        case 'left':   return { x, y: y + h / 2 };
        case 'right':  return { x: x + w, y: y + h / 2 };
      }
    }

    function getNodeRect(id) {
      const el = container.querySelector(`[data-id="${id}"]:not(.node--hidden)`);
      if (!el) return null;
      const { x, y, w, h } = getOffsetPos(el);
      return { left: x, top: y, right: x + w, bottom: y + h, cx: x + w / 2, cy: y + h / 2, width: w, height: h };
    }

    function routeLine(fromId, toId) {
      const fr = getNodeRect(fromId);
      const tr = getNodeRect(toId);
      if (!fr || !tr) return null;

      const GAP = 3;
      const sameRow = !(fr.bottom < tr.top - 10 || tr.bottom < fr.top - 10);

      if (sameRow) {
        const goingRight = fr.cx < tr.cx;
        const from = getEdge(fromId, goingRight ? 'right' : 'left');
        const to = getEdge(toId, goingRight ? 'left' : 'right');
        if (!from || !to) return null;
        to.x += goingRight ? -GAP : GAP;
        const dist = Math.abs(to.x - from.x);
        const cp = dist * 0.35;
        return `M ${from.x} ${from.y} C ${from.x + (goingRight ? cp : -cp)} ${from.y}, ${to.x + (goingRight ? -cp : cp)} ${to.y}, ${to.x} ${to.y}`;
      } else {
        const sourceEx = EXERCISES.find(e => e.id === fromId);
        const targetEx = EXERCISES.find(e => e.id === toId);
        const needsLateral = sourceEx && targetEx &&
          sourceEx.section === 'trunk' && targetEx.section === 'branches';

        if (needsLateral) {
          const from = getEdge(fromId, 'bottom');
          const to = getEdge(toId, 'top');
          if (!from || !to) return null;
          to.y -= GAP;
          const dy = to.y - from.y;
          const edgeX = cw - 20;
          const corridorX = from.x + (edgeX - from.x) * 0.65;
          const cp1x = corridorX, cp1y = from.y + dy * 0.3;
          const cp2x = to.x + (corridorX - to.x) * 0.2, cp2y = to.y - dy * 0.3;
          return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
        }

        const goingDown = fr.cy < tr.cy;
        if (goingDown) {
          const from = getEdge(fromId, 'bottom');
          const to = getEdge(toId, 'top');
          if (!from || !to) return null;
          to.y -= GAP;
          const dy = to.y - from.y;
          const cp = Math.max(dy * 0.45, 40);
          return `M ${from.x} ${from.y} C ${from.x} ${from.y + cp}, ${to.x} ${to.y - cp}, ${to.x} ${to.y}`;
        } else {
          const from = getEdge(fromId, 'top');
          const to = getEdge(toId, 'bottom');
          if (!from || !to) return null;
          to.y += GAP;
          const dy = from.y - to.y;
          const cp = Math.max(dy * 0.45, 40);
          return `M ${from.x} ${from.y} C ${from.x} ${from.y - cp}, ${to.x} ${to.y + cp}, ${to.x} ${to.y}`;
        }
      }
    }

    // Draw prerequisite lines
    EXERCISES.forEach((ex, i) => {
      if (!ex.prereqs) return;
      ex.prereqs.forEach(prereqId => {
        // Skip hidden nodes
        const fromEl = container.querySelector(`[data-id="${prereqId}"]:not(.node--hidden)`);
        const toEl = container.querySelector(`[data-id="${ex.id}"]:not(.node--hidden)`);
        if (!fromEl || !toEl) return;

        const d = routeLine(prereqId, ex.id);
        if (!d) return;

        const sourceEx = EXERCISES.find(e => e.id === prereqId);
        const colors = LAYER_COLORS[sourceEx.layer] || LAYER_COLORS.basics;
        const delay = `${i * 0.06}s`;

        const isCrossSection = sourceEx.section === 'trunk' &&
          EXERCISES.find(e => e.id === ex.id)?.section === 'branches';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.classList.add('conn-prereq');
        if (isCrossSection) path.classList.add('conn-cross-section');
        path.style.stroke = colors.accent;
        path.style.animationDelay = delay;
        path.dataset.from = prereqId;
        path.dataset.to = ex.id;
        svg.appendChild(path);

        // Arrowhead
        const len = path.getTotalLength();
        const ARROW_LEN = 8, ARROW_HALF_W = 4;
        const tip = path.getPointAtLength(len);
        const base = path.getPointAtLength(len - ARROW_LEN);
        const visibleLen = len - ARROW_LEN;
        path.style.strokeDasharray = `${visibleLen} ${len}`;
        path.style.setProperty('--line-len', visibleLen);

        const angle = Math.atan2(tip.y - base.y, tip.x - base.x);
        const perp = angle + Math.PI / 2;
        const bx1 = base.x + ARROW_HALF_W * Math.cos(perp);
        const by1 = base.y + ARROW_HALF_W * Math.sin(perp);
        const bx2 = base.x - ARROW_HALF_W * Math.cos(perp);
        const by2 = base.y - ARROW_HALF_W * Math.sin(perp);

        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrow.setAttribute('points', `${bx1},${by1} ${tip.x},${tip.y} ${bx2},${by2}`);
        arrow.classList.add('conn-arrow');
        if (isCrossSection) arrow.classList.add('arrow-cross-section');
        arrow.style.fill = colors.accent;
        arrow.style.animationDelay = `${parseFloat(delay) + 0.5}s`;
        arrow.dataset.from = prereqId;
        arrow.dataset.to = ex.id;
        svg.appendChild(arrow);
      });
    });

    // Morph icons
    if (typeof MUTATIONS !== 'undefined') {
      const cr = container.getBoundingClientRect();
      const pageOffX = cr.left + window.scrollX;
      const pageOffY = cr.top + window.scrollY;

      MUTATIONS.forEach(mutation => {
        const path = svg.querySelector(`.conn-prereq[data-from="${mutation.from}"][data-to="${mutation.to}"]`);
        if (!path) return;

        const lineDelay = parseFloat(path.style.animationDelay) || 0;
        const len = path.getTotalLength();
        const mid = path.getPointAtLength(len / 2);
        const SIZE = 28;

        const icon = document.createElement('div');
        icon.className = 'morph-icon';
        icon.style.left = `${pageOffX + mid.x - SIZE / 2}px`;
        icon.style.top = `${pageOffY + mid.y - SIZE / 2}px`;
        icon.style.animationDelay = `${lineDelay + 0.25}s`;
        icon.innerHTML = '<span class="morph-icon-text">&lt;/&gt;</span>';
        icon.addEventListener('click', (e) => {
          e.stopPropagation();
          openMorphModal(mutation);
        });
        document.body.appendChild(icon);
      });
    }
  }

  // ════════════════════════════════════════════════════════════
  // TOOLTIP
  // ════════════════════════════════════════════════════════════
  function showTooltip(event, ex) {
    const apis = ex.apis || [];
    if (!apis.length) { tooltip.classList.remove('tooltip--visible'); return; }

    tooltip.innerHTML = `
      <div class="tooltip-apis-label">Concepts</div>
      <div class="tooltip-apis">${apis.map(a => `<span class="api-tag">${typeof a === 'string' ? a : a.name}</span>`).join('')}</div>
    `;
    tooltip.classList.add('tooltip--visible');

    const nr = event.currentTarget.getBoundingClientRect();
    tooltip.style.left = '0px';
    tooltip.style.top = '0px';
    const tr = tooltip.getBoundingClientRect();

    let left = nr.left + nr.width / 2 - tr.width / 2;
    let top = nr.bottom + 10;
    if (left < 8) left = 8;
    if (left + tr.width > window.innerWidth - 8) left = window.innerWidth - tr.width - 8;
    if (top + tr.height > window.innerHeight - 8) top = nr.top - tr.height - 10;

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';

    highlightConnections(ex.id);
  }

  function hideTooltip() {
    tooltip.classList.remove('tooltip--visible');
    if (currentDetailEx) {
      clearHighlights();
      highlightConnections(currentDetailEx.id);
    } else {
      clearHighlights();
    }
  }

  function highlightConnections(id) {
    const svg = container.querySelector('.connections-svg');
    if (!svg) return;
    svg.querySelectorAll('[data-from][data-to]').forEach(el => {
      if (el.dataset.from === id || el.dataset.to === id) el.classList.add('conn-highlight');
    });
  }

  function clearHighlights() {
    const svg = container.querySelector('.connections-svg');
    if (!svg) return;
    svg.querySelectorAll('.conn-highlight').forEach(p => p.classList.remove('conn-highlight'));
  }

  // ════════════════════════════════════════════════════════════
  // DETAIL PANEL
  // ════════════════════════════════════════════════════════════
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function showDetail(ex, layer) {
    currentDetailEx = ex;
    clearHighlights();
    highlightConnections(ex.id);
    const colors = LAYER_COLORS[ex.layer] || LAYER_COLORS.basics;

    detailPanel.style.setProperty('--panel-accent', colors.accent);
    detailPanel.style.setProperty('--panel-accent-bg', colors.accentBg);

    const progressDots = EXERCISES.map(e => {
      const isCurrent = e.id === ex.id;
      const completed = isCompleted(e.id);
      const dotColor = isCurrent ? colors.accent : (completed ? '#34d399' : (e.done ? 'rgba(255,255,255,0.15)' : undefined));
      const style = dotColor ? `background:${dotColor};` : '';
      const cls = `detail-progress-dot ${e.done ? 'detail-progress-dot--done' : 'detail-progress-dot--future'} ${isCurrent ? 'detail-progress-dot--current' : ''} ${completed ? 'detail-progress-dot--completed' : ''}`;
      return `<div class="${cls}" style="${style}" title="${e.id} — ${e.title}"></div>`;
    }).join('');

    const shared = ex.shared || [];
    const bridgesHtml = shared.length > 0
      ? shared.map(s =>
          (s.targets || []).map(t =>
            `<span class="detail-bridge">${s.concept} <span class="detail-bridge-arrow">&rarr;</span> <span class="detail-bridge-target">${t}</span></span>`
          ).join('')
        ).join('')
      : '';

    const insights = ex.insights || [];
    const completed = isCompleted(ex.id);

    const leftCol = `
      <div class="detail-left">
        <div class="detail-header">
          <div class="detail-number" style="color:${colors.accent}">${ex.id}</div>
          <div class="detail-title-group">
            <div class="detail-title">${ex.title}</div>
            <div class="detail-meta">
              <span class="detail-layer-badge" style="background:${colors.bg};color:${colors.label};border:1px solid ${colors.border}">${layer.label}</span>
              <span class="detail-status-badge ${ex.done ? 'detail-status-badge--done' : 'detail-status-badge--future'}">
                ${ex.done ? (completed ? '&#10003; Fait' : 'Disponible') : 'Bientôt'}
              </span>
              ${ex.jourJ ? '<span class="mode-badge mode-badge--jour-j" style="margin-left:4px">Jour J</span>' : ''}
            </div>
          </div>
        </div>
        <div class="detail-progress">${progressDots}</div>
        ${bridgesHtml ? `
          <div class="detail-section">
            <div class="detail-section-label">Concepts partagés</div>
            <div class="detail-bridges">${bridgesHtml}</div>
          </div>
        ` : ''}
        ${insights.length ? `
          <div class="detail-section">
            <div class="detail-section-label">Insights</div>
            <div class="detail-insights">
              ${insights.map(i => `<div class="detail-insight">${i}</div>`).join('')}
            </div>
          </div>
        ` : ''}
        ${ex.done ? `
          <button class="detail-mark-done ${completed ? 'detail-mark-done--completed' : ''}" id="markDoneBtn">
            ${completed ? '&#10003; Terminé' : 'Marquer comme fait'}
          </button>
        ` : ''}
      </div>
    `;

    const rightCol = ex.done ? buildDoneRightCol(ex) : buildFutureRightCol(ex);

    detailContent.innerHTML = `${leftCol}<div class="detail-divider"></div>${rightCol}`;
    detailPanel.classList.add('detail-panel--visible');

    requestAnimationFrame(() => {
      const panelH = detailPanel.offsetHeight;
      document.body.style.paddingBottom = panelH + 'px';

      const node = container.querySelector(`[data-id="${ex.id}"]`);
      if (node) {
        const nodeRect = node.getBoundingClientRect();
        const visibleH = window.innerHeight - panelH;
        const targetY = window.scrollY + nodeRect.top + nodeRect.height / 2 - visibleH / 2;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    });

    bindDetailInteractions(ex);

    // Mark done button
    const markDoneBtn = document.getElementById('markDoneBtn');
    if (markDoneBtn) {
      markDoneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCompleted(ex.id);
        // Re-render node
        const nodeEl = container.querySelector(`[data-id="${ex.id}"]`);
        if (nodeEl) {
          const nowCompleted = isCompleted(ex.id);
          const statusEl = nodeEl.querySelector('.node-status');
          statusEl.className = `node-status ${nowCompleted ? 'node-status--completed' : (ex.done ? 'node-status--done' : 'node-status--future')}`;
        }
        // Re-show detail
        showDetail(ex, layer);
      });
    }

    // Highlight code
    if (ex.code && ex.done) highlightDetailCode(ex.code);
  }

  function buildDoneRightCol(ex) {
    const apis = ex.apis || [];
    const steps = ex.steps || [];

    // Steps section (guided exercises)
    let stepsHtml = '';
    if (steps.length) {
      stepsHtml = `
        <div class="detail-section">
          <div class="detail-section-label">Étapes</div>
          <div class="detail-steps">
            ${steps.map((s, i) => `
              <div class="detail-step">
                <div class="detail-step-number">${String(i + 1).padStart(2, '0')}</div>
                <div class="detail-step-content">
                  <div class="detail-step-instruction">${s.instruction}</div>
                  ${s.copyable ? `
                    <div class="detail-step-copyable">
                      <code>${escapeHtml(s.copyable)}</code>
                      <button class="detail-step-copy-btn" data-copy="${escapeHtml(s.copyable)}">Copier</button>
                    </div>
                  ` : ''}
                  ${s.expected ? `<div class="detail-step-expected">→ ${s.expected}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // APIs section
    let apisHtml = '';
    if (apis.length) {
      apisHtml = `
        <div class="detail-section">
          <div class="detail-section-label">Concepts clés <span style="opacity:0.5;font-weight:400">— cliquer pour détails</span></div>
          <div class="detail-apis">
            ${apis.map((a, i) => {
              const name = typeof a === 'string' ? a : a.name;
              const hasDetail = typeof a !== 'string' && a.detail;
              return `<span class="api-tag" ${hasDetail ? `data-api-idx="${i}"` : ''}>${name}</span>`;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Prereqs
    const prereqsHtml = (ex.prereqs || []).length > 0
      ? (ex.prereqs || []).map(pId => {
          const pEx = EXERCISES.find(e => e.id === pId);
          return `<span class="detail-prereq-chip" data-navigate="${pId}">
            <span class="detail-prereq-num">${pId}</span> ${pEx ? pEx.title : pId}
          </span>`;
        }).join('')
      : '<span style="font-size:0.75rem;color:var(--text-muted)">Aucun — point de départ</span>';

    // Code section
    const codeSection = ex.code ? `
      <div class="detail-code-section">
        <div class="detail-section-label">Exemple</div>
        <div class="detail-code" id="detailCodeContainer">${escapeHtml(ex.code)}</div>
      </div>
    ` : '';

    return `
      <div class="detail-right" id="detailRight">
        ${stepsHtml}
        ${apisHtml}
        <div class="detail-section">
          <div class="detail-section-label">Prérequis</div>
          <div class="detail-prereqs">${prereqsHtml}</div>
        </div>
        ${codeSection}
      </div>
    `;
  }

  function buildFutureRightCol(ex) {
    const prereqsHtml = (ex.prereqs || []).map(pId => {
      const pEx = EXERCISES.find(e => e.id === pId);
      const done = pEx && pEx.done;
      const icon = done ? '<span style="color:#34d399">&#10003;</span>' : '<span style="color:var(--text-muted)">&#9675;</span>';
      return `<span class="detail-prereq-chip" data-navigate="${pId}" style="${done ? 'border-color:rgba(52,211,153,0.2)' : ''}">
        ${icon} <span class="detail-prereq-num">${pId}</span> ${pEx ? pEx.title : pId}
      </span>`;
    }).join('');

    const completedPrereqs = (ex.prereqs || []).filter(pId => {
      const p = EXERCISES.find(e => e.id === pId);
      return p && p.done;
    }).length;

    return `
      <div class="detail-right" id="detailRight">
        <div class="detail-section">
          <div class="detail-locked-msg">
            Prochaine étape du parcours.<br>
            <strong>${completedPrereqs}/${(ex.prereqs || []).length}</strong> prérequis complétés.
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section-label">Prérequis</div>
          <div class="detail-prereqs">${prereqsHtml}</div>
        </div>
      </div>
    `;
  }

  function showApiInspect(ex, apiIdx) {
    const api = ex.apis[apiIdx];
    if (!api || typeof api === 'string') return;

    const rightEl = document.getElementById('detailRight');
    if (!rightEl) return;

    rightEl.style.animation = 'none';
    rightEl.offsetHeight;
    rightEl.style.animation = 'detailFadeUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) backwards';

    rightEl.innerHTML = `
      <div class="api-inspect">
        <button class="api-inspect-back" id="apiInspectBack">&larr; Retour</button>
        <div class="api-inspect-name">${api.name}</div>
        ${api.from ? `<div class="api-inspect-from">${api.from}</div>` : ''}
        ${api.signature ? `<div class="api-inspect-signature">${api.signature}</div>` : ''}
        <div class="api-inspect-detail">${api.detail}</div>
      </div>
    `;

    detailContent.querySelectorAll('.api-tag').forEach(t => t.classList.remove('api-tag--active'));
    const activeTag = detailContent.querySelector(`[data-api-idx="${apiIdx}"]`);
    if (activeTag) activeTag.classList.add('api-tag--active');

    document.getElementById('apiInspectBack').addEventListener('click', (e) => {
      e.stopPropagation();
      rightEl.style.animation = 'none';
      rightEl.offsetHeight;
      rightEl.style.animation = 'detailFadeUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) backwards';
      rightEl.outerHTML = buildDoneRightCol(ex);
      detailContent.querySelectorAll('.api-tag').forEach(t => t.classList.remove('api-tag--active'));
      bindDetailInteractions(ex);
      if (ex.code) highlightDetailCode(ex.code);
    });
  }

  function bindDetailInteractions(ex) {
    // API tags
    detailContent.querySelectorAll('[data-api-idx]').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.stopPropagation();
        showApiInspect(ex, parseInt(tag.dataset.apiIdx));
      });
    });

    // Prereq chips
    detailContent.querySelectorAll('[data-navigate]').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = chip.dataset.navigate;
        const targetEx = EXERCISES.find(ex => ex.id === targetId);
        if (targetEx) {
          showDetail(targetEx, LAYER_META[targetEx.layer]);
          const targetNode = container.querySelector(`[data-id="${targetId}"]`);
          if (targetNode) targetNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    // Copy buttons
    detailContent.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.copy;
        navigator.clipboard.writeText(text).then(() => {
          const orig = btn.textContent;
          btn.textContent = 'Copié !';
          setTimeout(() => btn.textContent = orig, 1500);
        });
      });
    });
  }

  function closeDetailPanel() {
    currentDetailEx = null;
    detailPanel.classList.remove('detail-panel--visible');
    document.body.style.paddingBottom = '';
    clearHighlights();
  }

  // ════════════════════════════════════════════════════════════
  // SHIKI (lazy-loaded)
  // ════════════════════════════════════════════════════════════
  function getShikiEngine() {
    if (shikiReady) return shikiReady;
    shikiReady = (async () => {
      const [{ createHighlighter }, { codeToKeyedTokens, createMagicMoveMachine }, { MagicMoveRenderer }] = await Promise.all([
        import('https://esm.sh/shiki@3'),
        import('https://esm.sh/shiki-magic-move@0.5/core'),
        import('https://esm.sh/shiki-magic-move@0.5/renderer'),
      ]);
      const highlighter = await createHighlighter({
        themes: ['vitesse-dark'],
        langs: ['javascript', 'bash', 'json', 'markdown'],
      });
      const machine = createMagicMoveMachine(
        code => codeToKeyedTokens(highlighter, code, { lang: 'javascript', theme: 'vitesse-dark' }),
      );
      return { machine, MagicMoveRenderer };
    })();
    return shikiReady;
  }

  async function highlightDetailCode(code) {
    const codeContainer = document.getElementById('detailCodeContainer');
    if (!codeContainer) return;
    try {
      const { machine, MagicMoveRenderer } = await getShikiEngine();
      const step = machine.commit(code).current;
      const renderer = new MagicMoveRenderer(codeContainer);
      codeContainer.textContent = '';
      renderer.replace(step);
    } catch { /* fallback: keep escaped text */ }
  }

  // ════════════════════════════════════════════════════════════
  // MORPH MODAL
  // ════════════════════════════════════════════════════════════
  async function openMorphModal(mutation) {
    const morphOverlay = document.getElementById('morphOverlay');
    const fromEx = EXERCISES.find(e => e.id === mutation.from);
    const toEx = EXERCISES.find(e => e.id === mutation.to);

    document.getElementById('morphModalTitle').innerHTML = `
      <span>${fromEx.id} ${fromEx.title}</span>
      <span class="morph-modal-arrow">&rarr;</span>
      <span>${toEx.id} ${toEx.title}</span>
    `;

    const modalContent = document.getElementById('morphModalContent');
    modalContent.innerHTML = '<div style="text-align:center;color:var(--text-secondary);padding:24px;">Chargement...</div>';
    morphOverlay.classList.add('morph-overlay--visible');

    const { machine, MagicMoveRenderer } = await getShikiEngine();
    modalContent.innerHTML = '';

    mutation.blocks.forEach(block => {
      const blockEl = document.createElement('div');
      blockEl.className = 'morph-block';

      const legend = document.createElement('div');
      legend.className = 'morph-legend';
      legend.innerHTML = block.legend;
      blockEl.appendChild(legend);

      const codeContainer = document.createElement('div');
      codeContainer.className = 'morph-code';
      blockEl.appendChild(codeContainer);

      const beforeStep = machine.commit(block.before).current;
      const afterStep = machine.commit(block.after).current;
      const renderer = new MagicMoveRenderer(codeContainer);

      const controls = document.createElement('div');
      controls.className = 'morph-controls';
      controls.innerHTML = `
        <button class="morph-btn morph-btn-before morph-btn--active" data-action="before">&lsaquo; Avant</button>
        <button class="morph-btn morph-btn-play" data-action="play"><svg class="morph-btn-play-icon" width="10" height="10" viewBox="0 0 10 10"><polygon points="1,0 9,5 1,10" fill="currentColor"/></svg><span class="morph-btn-play-label"><span class="morph-btn-play-label-play">Play</span><span class="morph-btn-play-label-revert">Revert</span></span></button>
        <button class="morph-btn morph-btn-after" data-action="after">Après &rsaquo;</button>
      `;
      blockEl.appendChild(controls);
      modalContent.appendChild(blockEl);

      renderer.replace(beforeStep);
      const beforeH = codeContainer.offsetHeight;
      renderer.replace(afterStep);
      const afterH = codeContainer.offsetHeight;
      renderer.replace(beforeStep);
      codeContainer.style.height = beforeH + 'px';
      codeContainer.style.overflow = 'hidden';
      let state = 'before';

      const playBtn = controls.querySelector('.morph-btn-play');

      function updateButtons(newState) {
        state = newState;
        controls.querySelectorAll('.morph-btn').forEach(b => b.classList.remove('morph-btn--active'));
        if (state === 'before') {
          controls.querySelector('.morph-btn-before').classList.add('morph-btn--active');
          playBtn.classList.remove('morph-btn-play--after');
        } else {
          controls.querySelector('.morph-btn-after').classList.add('morph-btn--active');
          playBtn.classList.add('morph-btn-play--after');
        }
      }

      controls.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;

        if (action === 'before') {
          renderer.replace(beforeStep);
          codeContainer.style.transition = 'none';
          codeContainer.style.height = beforeH + 'px';
          updateButtons('before');
        } else if (action === 'after') {
          renderer.replace(afterStep);
          codeContainer.style.transition = 'none';
          codeContainer.style.height = afterH + 'px';
          updateButtons('after');
        } else if (action === 'play') {
          codeContainer.style.transition = 'height 0.8s ease';
          if (state === 'after') {
            codeContainer.style.height = beforeH + 'px';
            updateButtons('before');
            await renderer.render(beforeStep);
          } else {
            codeContainer.style.height = afterH + 'px';
            updateButtons('after');
            await renderer.render(afterStep);
          }
        }
      });
    });
  }

  function closeMorphModal() {
    document.getElementById('morphOverlay').classList.remove('morph-overlay--visible');
  }

  // ════════════════════════════════════════════════════════════
  // GLOBAL EVENTS
  // ════════════════════════════════════════════════════════════
  function bindGlobalEvents() {
    detailClose.addEventListener('click', closeDetailPanel);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const morphOverlay = document.getElementById('morphOverlay');
        if (morphOverlay && morphOverlay.classList.contains('morph-overlay--visible')) {
          closeMorphModal();
        } else {
          closeDetailPanel();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!detailPanel.contains(e.target) && !e.target.closest('.node') && !e.target.closest('.morph-icon')) {
        closeDetailPanel();
      }
    });

    // Morph modal
    const morphModalClose = document.getElementById('morphModalClose');
    if (morphModalClose) morphModalClose.addEventListener('click', closeMorphModal);

    const morphOverlay = document.getElementById('morphOverlay');
    if (morphOverlay) {
      morphOverlay.addEventListener('click', (e) => {
        if (e.target === morphOverlay) closeMorphModal();
      });
    }
  }

  return { init };
})();
