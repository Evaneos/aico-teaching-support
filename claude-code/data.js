// ════════════════════════════════════════════════════════════
// DATA — Exercise nodes and layer metadata for the Claude Code learning map
// ════════════════════════════════════════════════════════════

const EXERCISES = [
  {
    id: '01', section: 'trunk', title: 'Hello Claude Code', layer: 'basics', done: true, jourJ: true,
    concepts: 'installation, working directory, conversation',
    insights: [
      '<strong>Claude Code travaille dans un WORKING DIRECTORY</strong> — il peut lire et modifier tous les fichiers de ce dossier. Cela le rend utile bien au-delà du code : specs, notes, gestion de projet.',
      'Claude Code n\'est <strong>pas réservé aux devs</strong>. Un PM peut structurer des specs, un designer organiser des assets, un data scientist explorer des logs. Le working directory est le point d\'entrée universel.'
    ],
    steps: [
      { instruction: 'Vérifiez votre version de Node.js (>= 18 requis)', expected: 'Un numéro de version s\'affiche, ex: v20.11.0', copyable: 'node --version' },
      { instruction: 'Installez Claude Code via npm', expected: 'Installation terminée sans erreur', copyable: 'npm install -g @anthropic-ai/claude-code' },
      { instruction: 'Vérifiez que Claude Code est bien installé', expected: 'Le numéro de version de Claude Code s\'affiche', copyable: 'claude --version' },
      { instruction: 'Lancez Claude Code dans le répertoire courant', expected: 'L\'interface interactive de Claude Code s\'ouvre dans votre terminal', copyable: 'claude' },
      { instruction: 'Posez une question sur le répertoire courant', expected: 'Claude analyse les fichiers présents et vous décrit la structure du projet', copyable: 'Décris-moi ce que contient ce répertoire' }
    ],
    apis: [
      { name: 'claude',
        from: 'CLI',
        detail: 'La commande principale pour lancer Claude Code. Sans argument, elle ouvre une session interactive dans le <strong>working directory</strong> courant. Claude peut lire, écrire et modifier tous les fichiers de ce dossier. C\'est le point d\'entrée de toute interaction.' },
      { name: 'Working directory',
        from: 'concept',
        detail: 'Le répertoire depuis lequel vous lancez <code>claude</code>. C\'est le <strong>contexte implicite</strong> de toute conversation — Claude "voit" tous les fichiers de ce dossier et ses sous-dossiers. Changer de dossier avant de lancer Claude change complètement ce qu\'il peut faire.' },
      { name: '/help',
        from: 'commande interactive',
        detail: 'Affiche les commandes disponibles dans la session interactive. Les commandes commencent par <code>/</code> (slash commands). C\'est le point de départ pour découvrir les fonctionnalités : <code>/help</code>, <code>/config</code>, <code>/exit</code>, etc.' },
      { name: 'Conversation context',
        from: 'concept',
        detail: 'Claude maintient le contexte de toute la conversation en cours. Chaque message s\'ajoute à l\'historique — il se souvient de ce que vous avez dit et de ce qu\'il a fait. Le contexte est perdu quand vous quittez la session (sauf avec la mémoire, voir exercice 03).' }
    ],
    code: `# Installer Claude Code
npm install -g @anthropic-ai/claude-code

# Lancer dans un répertoire projet
cd mon-projet/
claude

# Dans la session interactive :
> Décris-moi la structure de ce projet
> Quels fichiers ont été modifiés récemment ?
> /help`,
    prereqs: [],
    shared: [
      { concept: 'working directory', targets: ['02', '03'] },
      { concept: 'conversation', targets: ['03', '05'] }
    ]
  },
  {
    id: '02', section: 'trunk', title: 'Plugins & Skills', layer: 'skills', done: true, jourJ: true,
    concepts: 'plugins, marketplaces, skills, brainstorming',
    insights: [
      'Les skills ne sont <strong>PAS que des outils de code</strong> — brainstorming, planification, debugging, review. Elles structurent <strong>COMMENT</strong> l\'agent réfléchit, pas seulement ce qu\'il fait.',
      'Un plugin est un <strong>bundle de skills + serveurs MCP</strong>. Installer un seul plugin peut vous donner <strong>20+ nouvelles capacités</strong> d\'un coup.'
    ],
    steps: [
      { instruction: 'Ajoutez un marketplace de plugins', expected: 'Le marketplace est ajouté à la configuration, un message de confirmation s\'affiche', copyable: '/plugin marketplace add https://marketplace.claudecode.dev' },
      { instruction: 'Installez le plugin "superpowers"', expected: 'Le plugin est téléchargé et ses skills sont disponibles', copyable: '/plugin install superpowers' },
      { instruction: 'Listez les skills disponibles après installation', expected: 'Une liste de skills s\'affiche avec leurs noms et descriptions', copyable: '/skills' },
      { instruction: 'Lancez une session de brainstorming', expected: 'Claude entre en mode brainstorming structuré — il pose des questions, explore des idées, organise les résultats', copyable: '/brainstorm Comment améliorer l\'onboarding de nos nouveaux développeurs ?' }
    ],
    apis: [
      { name: '/plugin marketplace add',
        from: 'commande interactive',
        detail: 'Ajoute une source de plugins (marketplace). Un marketplace est un registre distant qui liste des plugins disponibles. Une fois ajouté, vous pouvez parcourir et installer ses plugins avec <code>/plugin install</code>.' },
      { name: '/plugin install',
        from: 'commande interactive',
        detail: 'Installe un plugin depuis un marketplace configuré. Le plugin est téléchargé et ses skills et serveurs MCP sont enregistrés. Après installation, les nouvelles skills apparaissent dans <code>/skills</code> et les outils MCP sont disponibles dans la conversation.' },
      { name: 'Skills',
        from: 'concept',
        detail: 'Les skills sont des <strong>instructions en langage naturel</strong> qui modifient le comportement de l\'agent. Elles ne sont pas du code — ce sont des procédures structurées en markdown. Quand Claude reconnaît qu\'une skill est pertinente, il charge ses instructions et les suit. Voir exercice 04 pour créer les vôtres.' },
      { name: '/brainstorm',
        from: 'skill interactive',
        detail: 'Une skill de brainstorming structuré. Claude pose des questions exploratoires, génère des idées divergentes, puis les organise et les priorise. C\'est un exemple concret de skill qui change le <strong>mode de pensée</strong> de l\'agent — pas ses outils.' }
    ],
    code: `# Ajouter un marketplace
/plugin marketplace add https://marketplace.claudecode.dev

# Installer un plugin (bundle de skills + MCP)
/plugin install superpowers

# Voir toutes les skills disponibles
/skills

# Utiliser une skill de brainstorming
/brainstorm Comment restructurer notre API ?

# Le plugin a aussi ajouté des outils MCP
# → disponibles automatiquement dans la conversation`,
    prereqs: ['01'],
    shared: [
      { concept: 'skills', targets: ['03', '04', '05'] },
      { concept: 'plugins', targets: ['04', '06'] }
    ]
  },
  {
    id: '03', section: 'trunk', title: 'CLAUDE.md & Memory', layer: 'skills', done: true, jourJ: false,
    concepts: 'CLAUDE.md, project memory, conventions, context',
    insights: [
      '<strong>CLAUDE.md est un README pour l\'IA</strong> — il indique à Claude les règles de VOTRE projet sans avoir à les répéter à chaque conversation. Conventions de code, architecture, interdictions : tout ce que vous diriez à un nouveau dev.',
      'La mémoire <strong>persiste entre les conversations</strong>. Claude construit sa compréhension au fil du temps — qui vous êtes, comment vous travaillez, ce qu\'il faut éviter. C\'est un collègue qui apprend.'
    ],
    steps: [
      { instruction: 'Créez un fichier CLAUDE.md à la racine de votre projet', expected: 'Le fichier est créé avec vos conventions de projet', copyable: 'cat > CLAUDE.md << \'EOF\'\n# Conventions projet\n\n## Stack technique\n- Node.js + TypeScript\n- Tests avec Vitest\n\n## Règles\n- Toujours écrire les messages de commit en français\n- Ne jamais modifier les fichiers dans /config sans validation\n- Utiliser des fonctions fléchées sauf pour les méthodes de classe\nEOF' },
      { instruction: 'Lancez Claude et demandez-lui de créer un fichier', expected: 'Claude respecte automatiquement les conventions définies dans CLAUDE.md (ex: utilise des fonctions fléchées)', copyable: 'claude\n> Crée un fichier utils.ts avec une fonction de validation d\'email' },
      { instruction: 'Observez comment Claude utilise le CLAUDE.md', expected: 'Claude mentionne les conventions qu\'il suit et les applique dans son code', copyable: 'Quelles conventions de ce projet connais-tu ?' },
      { instruction: 'Explorez les fichiers de mémoire', expected: 'Vous voyez les différents fichiers de mémoire dans le dossier .claude/', copyable: 'ls -la ~/.claude/ && echo "---" && ls -la .claude/ 2>/dev/null' }
    ],
    apis: [
      { name: 'CLAUDE.md',
        from: 'fichier de configuration',
        detail: 'Fichier markdown à la racine du projet, lu automatiquement par Claude au début de chaque conversation. Contient les conventions, l\'architecture, les interdictions, les patterns préférés. C\'est l\'équivalent d\'un <strong>system prompt persistant</strong> lié au projet, pas à l\'utilisateur.' },
      { name: '.claude/',
        from: 'répertoire de configuration',
        detail: 'Répertoire contenant les fichiers de mémoire et de configuration locaux au projet. Claude y stocke ce qu\'il apprend au fil des conversations — feedback reçu, décisions prises, contexte accumulé.' },
      { name: 'Memory types',
        from: 'concept',
        detail: 'Quatre types de mémoire : <strong>user</strong> (préférences globales dans <code>~/.claude/</code>), <strong>project</strong> (contexte projet dans <code>.claude/</code>), <strong>feedback</strong> (retours que vous donnez, stockés automatiquement), <strong>reference</strong> (fichiers que Claude a lus et dont il retient la structure). Chaque type a une portée et une durée de vie différentes.' },
      { name: '/memory',
        from: 'commande interactive',
        detail: 'Permet de consulter et gérer la mémoire de Claude. Vous pouvez voir ce qu\'il a retenu, corriger des informations erronées, ou effacer des souvenirs obsolètes. La mémoire est transparente et contrôlable.' }
    ],
    code: `# CLAUDE.md — lu automatiquement à chaque conversation

# Conventions projet

## Architecture
- Monorepo avec packages/ pour chaque module
- Shared types dans packages/common/

## Code style
- TypeScript strict, pas de any
- Fonctions fléchées, pas de function declarations
- Noms de variables en camelCase

## Interdictions
- Ne JAMAIS modifier .env.production
- Ne pas ajouter de dépendances sans validation humaine`,
    prereqs: ['01'],
    shared: [
      { concept: 'CLAUDE.md', targets: ['04', '06'] },
      { concept: 'mémoire', targets: ['05'] }
    ]
  },
  {
    id: '04', section: 'branches', title: 'Creating Skills', layer: 'skills', done: true, jourJ: false,
    concepts: 'custom skills, SKILL.md format, activation triggers, skill testing',
    insights: [
      'Une skill est <strong>juste un fichier markdown avec du frontmatter</strong>. Pas de code, pas d\'API — des instructions en langage naturel pur qui changent le comportement de l\'agent.',
      'La partie la plus difficile d\'une skill n\'est pas de l\'écrire — c\'est de <strong>tester le trigger d\'activation</strong>. L\'agent doit reconnaître QUAND l\'utiliser, pas seulement comment.'
    ],
    steps: [
      { instruction: 'Créez le répertoire pour votre skill', expected: 'Le répertoire est créé', copyable: 'mkdir -p .claude/skills/code-review' },
      { instruction: 'Créez le fichier SKILL.md avec le frontmatter', expected: 'Le fichier est créé avec les métadonnées et les instructions', copyable: 'cat > .claude/skills/code-review/SKILL.md << \'EOF\'\n---\nname: code-review\ndescription: Effectue une revue de code structurée avec checklist de sécurité, performance et maintenabilité\n---\n\n# Code Review Structurée\n\n## Quand activer\nQuand l\'utilisateur demande une revue de code, un review, ou montre du code à évaluer.\n\n## Procédure\n1. Lire le code complet avant de commenter\n2. Vérifier la checklist :\n   - [ ] Sécurité : injections, données sensibles exposées\n   - [ ] Performance : boucles N+1, requêtes inutiles\n   - [ ] Maintenabilité : nommage, complexité, duplication\n   - [ ] Tests : cas limites couverts\n3. Donner un score /10 avec justification\n4. Proposer un refactoring concret pour le point le plus critique\n\n## Règles\n- Toujours commencer par les points positifs\n- Maximum 5 remarques pour ne pas noyer le développeur\n- Chaque remarque doit avoir un exemple de correction\nEOF' },
      { instruction: 'Testez que la skill est détectée', expected: 'Votre skill "code-review" apparaît dans la liste', copyable: '/skills' },
      { instruction: 'Testez l\'activation de la skill', expected: 'Claude active la skill et suit la procédure structurée (checklist, score, refactoring)', copyable: 'Fais une review de ce fichier : utils.ts' },
      { instruction: 'Affinez les instructions si le comportement n\'est pas celui attendu', expected: 'Après modification du SKILL.md, le comportement s\'améliore', copyable: 'La review était bien mais tu as oublié le score /10. Modifie la skill pour rendre le score obligatoire.' }
    ],
    apis: [
      { name: 'SKILL.md frontmatter',
        from: 'convention Claude Code',
        detail: 'Le frontmatter YAML en tête du fichier définit les métadonnées : <code>name</code> (identifiant en minuscules avec tirets) et <code>description</code> (phrase courte décrivant quand utiliser la skill). Ces métadonnées sont injectées dans le system prompt — le corps du fichier n\'est chargé que quand la skill est activée (<strong>progressive disclosure</strong>).' },
      { name: 'Activation triggers',
        from: 'concept',
        detail: 'La section "Quand activer" du SKILL.md guide le modèle pour reconnaître les situations pertinentes. C\'est la partie la plus critique : trop large et la skill se déclenche à tort, trop étroit et elle n\'est jamais activée. Testez avec des formulations variées de la même demande.' },
      { name: '/skill',
        from: 'commande interactive',
        detail: 'Permet de tester et débuguer une skill. Vous pouvez forcer l\'activation d\'une skill spécifique pour vérifier son comportement sans dépendre du trigger automatique. Utile pendant le développement itératif.' },
      { name: 'Skill directory',
        from: 'convention',
        detail: 'Les skills sont organisées dans <code>.claude/skills/</code> (niveau projet) ou <code>~/.claude/skills/</code> (niveau utilisateur). Chaque skill a son propre dossier contenant un <code>SKILL.md</code>. La structure : <code>.claude/skills/ma-skill/SKILL.md</code>.' }
    ],
    code: `# .claude/skills/code-review/SKILL.md

---
name: code-review
description: Revue de code structurée avec checklist
---

# Code Review Structurée

## Quand activer
Quand l'utilisateur demande une revue de code.

## Procédure
1. Lire le code complet avant de commenter
2. Checklist : sécurité, performance, maintenabilité
3. Score /10 avec justification
4. Refactoring concret du point le plus critique

## Règles
- Commencer par les points positifs
- Maximum 5 remarques
- Chaque remarque = un exemple de correction`,
    prereqs: ['02', '03'],
    shared: [
      { concept: 'SKILL.md', targets: ['05', '06'] }
    ]
  },
  {
    id: '05', section: 'branches', title: 'Subagents', layer: 'agents', done: true, jourJ: false,
    concepts: 'subagents, parallel execution, worktrees, isolation, Agent tool',
    insights: [
      'Les subagents sont comme <strong>assigner des tâches à des membres d\'équipe</strong> — chacun travaille indépendamment avec son propre contexte. L\'agent principal coordonne.',
      'Les <strong>worktrees</strong> donnent à chaque agent une copie isolée du repo. Pas de conflits, pas de modifications qui se marchent dessus. Chaque agent a son propre bac à sable.'
    ],
    steps: [
      { instruction: 'Comprenez quand utiliser des subagents (tâches parallèles et indépendantes)', expected: 'Vous comprenez que les subagents sont utiles quand plusieurs tâches peuvent être exécutées en parallèle sans dépendance', copyable: 'Explique-moi quand et pourquoi utiliser des subagents plutôt que tout faire séquentiellement' },
      { instruction: 'Lancez un subagent de recherche', expected: 'Claude dispatche un agent qui recherche en parallèle pendant que la conversation principale continue', copyable: 'Recherche en parallèle : 1) les bonnes pratiques de testing en TypeScript et 2) les patterns de gestion d\'erreur en Node.js. Utilise des subagents.' },
      { instruction: 'Observez un subagent avec isolation worktree', expected: 'Claude crée un worktree pour isoler les modifications du subagent', copyable: 'Utilise un subagent dans un worktree isolé pour refactorer le fichier utils.ts sans impacter le reste du travail en cours' },
      { instruction: 'Observez l\'exécution parallèle', expected: 'Vous voyez les subagents travailler simultanément et l\'agent principal synthétiser leurs résultats', copyable: 'Lance 3 subagents en parallèle : un pour analyser la sécurité du code, un pour vérifier la performance, un pour suggérer des améliorations d\'architecture' }
    ],
    apis: [
      { name: 'Agent tool',
        from: 'outil interne Claude Code',
        detail: 'L\'outil interne que Claude utilise pour créer des subagents. Chaque subagent reçoit une <strong>description de tâche</strong> et travaille indépendamment. Le résultat est remonté à l\'agent principal qui synthétise. Les subagents ont accès aux mêmes outils (lecture de fichiers, etc.) mais dans un contexte isolé.' },
      { name: 'subagent_type',
        from: 'paramètre Agent tool',
        detail: 'Définit le type de subagent à créer. Permet de spécialiser le comportement : un subagent "researcher" explore la documentation, un subagent "coder" écrit et modifie du code. Le type influence le system prompt du subagent.' },
      { name: 'isolation: "worktree"',
        from: 'paramètre Agent tool',
        detail: 'Crée un <strong>git worktree</strong> pour le subagent — une copie isolée de l\'arbre de travail du repo. Le subagent peut modifier des fichiers sans affecter le working directory principal. Les changements sont ensuite fusionnés (ou non) par l\'agent principal. Essentiel pour les tâches de refactoring parallèles.' },
      { name: 'run_in_background',
        from: 'paramètre Agent tool',
        detail: 'Lance le subagent en arrière-plan. L\'agent principal continue de travailler pendant que le subagent exécute sa tâche. Les résultats sont récupérés quand le subagent termine. Permet une véritable <strong>exécution parallèle</strong>.' }
    ],
    code: `# L'agent principal coordonne, les subagents exécutent

# Subagent simple — recherche en parallèle
> Recherche les bonnes pratiques de testing TypeScript
  → Agent tool: { description: "...", run_in_background: true }

# Subagent avec isolation worktree
> Refactore utils.ts dans un worktree isolé
  → Agent tool: {
      description: "Refactorer utils.ts...",
      isolation: "worktree",    # copie isolée du repo
      run_in_background: true   # exécution parallèle
    }

# L'agent principal attend les résultats et synthétise
# Chaque subagent a son propre contexte et ses propres outils`,
    prereqs: ['02'],
    shared: [
      { concept: 'Agent tool', targets: ['06'] },
      { concept: 'isolation', targets: ['06'] }
    ]
  },
  {
    id: '06', section: 'branches', title: 'Hooks & Automation', layer: 'agents', done: true, jourJ: false,
    concepts: 'hooks, automation, settings.json, event-driven behavior',
    insights: [
      'Les hooks sont le pont entre <strong>"je veux que Claude fasse toujours X"</strong> et le fait que ça arrive vraiment — plus besoin de vous répéter à chaque conversation.',
      'Les hooks exécutent <strong>VOS commandes shell</strong> en réponse aux actions de Claude. Ce n\'est pas de l\'IA — c\'est de l\'<strong>automatisation déterministe</strong> déclenchée par des événements IA.'
    ],
    steps: [
      { instruction: 'Comprenez les types de hooks disponibles', expected: 'Vous identifiez les hooks principaux : PreToolUse, PostToolUse, Notification, etc.', copyable: 'Explique-moi les différents types de hooks disponibles dans Claude Code et quand chacun se déclenche' },
      { instruction: 'Créez un hook PreToolUse pour valider les modifications de fichiers sensibles', expected: 'Le hook est configuré dans settings.json et se déclenche avant toute modification de fichier', copyable: 'cat > .claude/settings.json << \'EOF\'\n{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Edit|Write",\n        "command": "echo \\\"Modification détectée: $CLAUDE_TOOL_INPUT\\\" >> .claude/audit.log\"\n      }\n    ]\n  }\n}\nEOF' },
      { instruction: 'Ajoutez un hook PostToolUse pour lancer les tests après modification', expected: 'Les tests se lancent automatiquement après chaque modification de fichier', copyable: 'Ajoute un hook PostToolUse qui lance npm test après chaque modification de fichier .ts ou .js' },
      { instruction: 'Configurez les settings globaux de Claude Code', expected: 'Vous comprenez la hiérarchie des settings : utilisateur, projet, et la résolution des conflits', copyable: 'cat ~/.claude/settings.json 2>/dev/null && echo "---" && cat .claude/settings.json 2>/dev/null' }
    ],
    apis: [
      { name: 'settings.json',
        from: 'fichier de configuration',
        detail: 'Fichier de configuration au format JSON. Existe à deux niveaux : <code>~/.claude/settings.json</code> (global utilisateur) et <code>.claude/settings.json</code> (projet). Les settings projet <strong>surchargent</strong> les settings utilisateur. C\'est ici que vous définissez les hooks, les permissions, et les préférences de comportement.' },
      { name: 'PreToolUse',
        from: 'type de hook',
        detail: 'Se déclenche <strong>avant</strong> que Claude exécute un outil (Edit, Write, Bash, etc.). Permet de valider, logger, ou bloquer une action. Le hook reçoit le nom de l\'outil et ses paramètres. Si la commande échoue (exit code != 0), l\'action est bloquée. Idéal pour les <strong>garde-fous</strong> sur les fichiers sensibles.' },
      { name: 'PostToolUse',
        from: 'type de hook',
        detail: 'Se déclenche <strong>après</strong> l\'exécution d\'un outil. Permet de réagir aux modifications : lancer des tests, formater le code, notifier une équipe. Le hook reçoit le résultat de l\'outil. N\'a pas le pouvoir de bloquer — l\'action est déjà faite.' },
      { name: 'Hook matcher',
        from: 'paramètre de hook',
        detail: 'Expression régulière qui filtre sur quel outil le hook se déclenche. <code>"Edit|Write"</code> matche les outils d\'édition, <code>"Bash"</code> matche les commandes shell. Permet de cibler précisément les actions qui déclenchent l\'automatisation.' },
      { name: 'Event patterns',
        from: 'concept',
        detail: 'Les hooks transforment Claude Code en système <strong>event-driven</strong>. Chaque action de l\'agent émet un événement (PreToolUse, PostToolUse, Notification). Vous attachez des commandes shell à ces événements. C\'est le même pattern que les git hooks ou les webhooks — mais déclenché par les actions de l\'IA.' }
    ],
    code: `# .claude/settings.json — hooks et automatisation

{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "echo \\"$(date): $CLAUDE_TOOL_NAME\\" >> .claude/audit.log"
      },
      {
        "matcher": "Bash",
        "command": "echo \\"Commande shell: $CLAUDE_TOOL_INPUT\\" >> .claude/audit.log"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "npm test --silent 2>/dev/null || echo 'Tests failed'"
      }
    ]
  }
}

# Les hooks sont déterministes — pas d'IA, du shell pur
# PreToolUse peut BLOQUER (exit 1) — garde-fou
# PostToolUse peut RÉAGIR — automatisation`,
    prereqs: ['03', '04'],
    shared: []
  }
];

// ════════════════════════════════════════════════════════════
// MUTATIONS — Code morphing data for connections
// Each mutation shows how a concept evolves between two exercises.
// ════════════════════════════════════════════════════════════
const MUTATIONS = [
  {
    from: '01', to: '02',
    blocks: [
      {
        legend: 'De la commande <code>claude</code> nue aux <strong>skills et plugins</strong> — le même outil, mais augmenté.',
        before: `# Lancer Claude Code
claude

# Conversation libre
> Décris-moi ce projet
> Crée un fichier utils.ts

# Claude répond avec ses capacités de base
# Pas de skills, pas de plugins — juste le LLM`,
        after: `# Ajouter des capacités via plugins
/plugin marketplace add https://marketplace.claudecode.dev
/plugin install superpowers

# Maintenant, des skills structurent la réflexion
/brainstorm Comment améliorer notre API ?
# → brainstorming structuré, pas juste du texte

# Les plugins ajoutent aussi des outils MCP
# → 20+ nouvelles capacités d'un coup`,
      },
    ],
  },
  {
    from: '02', to: '04',
    blocks: [
      {
        legend: '<strong>Utiliser</strong> des skills existantes → <strong>créer</strong> son propre <code>SKILL.md</code> — du consommateur au créateur.',
        before: `# Utiliser une skill installée via plugin
/skills
# → brainstorm, debug, review... (pré-installées)

/brainstorm Comment restructurer notre API ?
# Claude suit la procédure du plugin
# Vous n'avez aucun contrôle sur le "comment"`,
        after: `# Créer SA propre skill
mkdir -p .claude/skills/code-review

# SKILL.md — du markdown pur, pas du code
cat > .claude/skills/code-review/SKILL.md << 'EOF'
---
name: code-review
description: Revue de code structurée
---
## Procédure
1. Lire le code complet
2. Checklist sécurité/perf/maintenabilité
3. Score /10
EOF

# Même mécanisme, VOTRE procédure
> Fais une review de utils.ts
# → active VOTRE skill, suit VOTRE checklist`,
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// LAYER METADATA — Layer descriptions for the learning map
// ════════════════════════════════════════════════════════════
const LAYER_META = {
  basics: {
    label: 'Basics',
    className: 'layer--basics',
    glowColor: 'var(--basics-glow)',
    lineColor: 'var(--basics-line)',
    tagline: 'Installation & first steps',
    buildsOn: 'Getting started<br>install, configure, first conversation',
    tooltip: '<strong>Basics</strong> covers installation and your first interaction with Claude Code. You\'ll understand the working directory concept and have your first AI-assisted conversation.'
  },
  skills: {
    label: 'Skills & Plugins',
    className: 'layer--skills',
    glowColor: 'var(--skills-glow)',
    lineColor: 'var(--skills-line)',
    tagline: 'Extend capabilities with plugins and skills',
    buildsOn: 'Built on basics<br>adds plugins, skills, project memory',
    tooltip: '<strong>Skills & Plugins</strong> extend Claude Code\'s capabilities. Plugins bundle MCP servers and skills. Skills are natural-language instructions that change how the agent thinks and works — brainstorming, planning, debugging, and more.'
  },
  agents: {
    label: 'Advanced Agents',
    className: 'layer--agents',
    glowColor: 'var(--agents-glow)',
    lineColor: 'var(--agents-line)',
    tagline: 'Subagents, hooks & automation',
    buildsOn: 'Built on skills<br>adds parallel agents, hooks, automation',
    tooltip: '<strong>Advanced Agents</strong> covers parallel execution with subagents, isolated worktrees, and event-driven automation with hooks. This is where Claude Code becomes a fully autonomous development partner.'
  }
};
