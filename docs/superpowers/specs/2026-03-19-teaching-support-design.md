# Teaching Support Platform — Design Spec

## Overview

Three interactive learning paths for Community Days 2026, built as static web pages deployed on GitHub Pages. Each path has a "Jour J" (event day) mode with guided exercises and a "Parcours complet" (extended) mode for self-paced learning afterward.

## Architecture

### Structure

```
aico-teaching-support/
├── index.html                    # Landing — pick a learning path
├── shared/
│   ├── learning-map-engine.js    # Generic skill-tree engine
│   ├── learning-map.css          # Shared styles
│   └── assets/                   # Shared icons/images
├── claude-code/
│   ├── index.html                # Learning map for Claude Code
│   └── data.js                   # Exercise data
├── notion-agents/
│   ├── index.html                # Learning map for Notion Agents
│   └── data.js                   # Exercise data
├── n8n/
│   ├── index.html                # Learning map for n8n
│   └── data.js                   # Exercise data
└── _reference/                   # Source material (not deployed)
```

### Core principle: one engine, three data files

The engine (`learning-map-engine.js`) is extracted and generalized from the langchain-learning repo's `learning-map.html`. It renders a skill tree with:
- Layer-grouped exercise nodes with colored badges
- SVG prerequisite arrows (cubic Bézier, smart routing)
- Click-to-open detail panels with insights, APIs/concepts, code/steps
- Progression tracking via localStorage
- Jour J / Complete toggle filtering
- Entrance animations, hover tooltips

Each path provides a `data.js` with the same schema as the original, plus enrichments for guided exercises (step-by-step instructions).

### Data Schema (per exercise)

```javascript
{
  id: '01',
  section: 'trunk',           // 'trunk' | 'branches'
  title: 'Exercise title',
  layer: 'basics',            // maps to layer colors
  done: true,                 // content ready
  jourJ: true,                // shown in Jour J mode
  concepts: 'key concepts',
  prereqs: ['00'],
  insights: ['<strong>Aha</strong> moment HTML'],
  // Steps replace code for non-code exercises
  steps: [
    { instruction: 'What to do', expected: 'What you should see', copyable: 'command to copy' }
  ],
  // Optional code snippet (for code-oriented exercises)
  code: `code snippet`,
  // Optional API reference (for technical exercises)
  apis: [{ name, from, detail, signature? }],
  shared: [{ concept, targets }]
}
```

## Learning Paths

### 1. Claude Code (30 min jour J)

**Layers:**
- `basics` (emerald green): Installation, first interaction
- `skills` (sky blue): Plugins, skills ecosystem
- `agents` (orange): Subagents, hooks, advanced patterns

**Scenario fil rouge:** Setting up and customizing a coding agent for a team project

**Jour J exercises (2):**
1. **Hello Claude Code** — Install, launch, first conversation, understand working directory
2. **Plugins & Skills** — Install superpowers, run a brainstorming session

**Extended exercises:**
3. **CLAUDE.md & Memory** — Configure project context, memory system
4. **Creating Skills** — Write a custom skill, test it
5. **Subagents** — Dispatch parallel agents, use worktrees
6. **Hooks & Automation** — Pre/post hooks, automated behaviors

### 2. Notion Custom Agents (15 min jour J)

**Layers:**
- `basics` (emerald green): Concepts, first agent
- `triggers` (sky blue): Triggers, events
- `advanced` (orange): Connected apps, patterns

**Scenario fil rouge:** Automating team communication and knowledge management

**Jour J exercise (1):**
1. **Your First Agent** — Create a scheduled agent that summarizes a database

**Extended exercises:**
2. **Database Triggers** — React to page creation/modification
3. **Slack Integration** — Agent posts to Slack on events
4. **Multi-Source Agent** — Web browsing + Notion data + Slack output

### 3. n8n (15 min jour J)

**Layers:**
- `basics` (emerald green): Nodes, triggers, first workflow
- `integration` (sky blue): APIs, services, data transformation
- `ai` (orange): AI Agent node, LLM chains

**Scenario fil rouge:** Building a team notification and automation pipeline

**Jour J exercise (1):**
1. **First Workflow** — Webhook trigger → transform → Slack notification

**Extended exercises:**
2. **API Orchestration** — Chain HTTP requests, transform data, conditional routing
3. **AI Agent Node** — Build a Slack bot powered by Claude via n8n
4. **Scheduled Pipeline** — Recurring data aggregation + notification

## Landing Page

Clean, dark-themed landing with three cards (one per path). Each card shows:
- Icon + title
- Time estimate (Jour J vs Complete)
- Exercise count
- Layer preview (colored dots)
- Link to the path's learning map

## Progression System

- `localStorage` key per path: `progress-claude-code`, `progress-notion-agents`, `progress-n8n`
- Stores: `{ exerciseId: { completed: boolean, completedAt: timestamp } }`
- Toggle button: "Jour J" (filters to `jourJ: true` exercises) / "Parcours complet" (shows all)
- Visual: completed exercises get a checkmark, green glow; progress dots in detail panel

## Enriched Detail Panel

The detail panel from the original learning map is enriched for guided exercises:
- **Steps section**: numbered step-by-step instructions with copyable commands/configs
- **Expected result**: what the learner should see after each step
- **"Mark as done" button**: saves to localStorage, updates the skill tree
- Falls back to the original code/APIs view for technical reference exercises

## Tech Stack

- Vanilla HTML/CSS/JS (no build step)
- Shiki for code syntax highlighting (lazy-loaded from CDN)
- GitHub Pages deployment
- Responsive layout (works on laptop screens, optimized for side-by-side with the tool)
