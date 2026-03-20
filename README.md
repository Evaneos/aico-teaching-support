# Zone DRS — Community Days R&D 2026

Trois circuits d'apprentissage interactifs pour le hackathon PIT STOP.

**[Accéder au site](https://evaneos.github.io/aico-teaching-support/)**

## Circuits

| # | Circuit | Jour J | Complet | Thème |
|---|---------|--------|---------|-------|
| 01 | [Claude Code](https://evaneos.github.io/aico-teaching-support/claude-code/) | 30 min (3 exercices) | 10 exercices | Coding agent : du premier prompt au plan multi-agents |
| 02 | [Notion Custom Agents](https://evaneos.github.io/aico-teaching-support/notion-agents/) | 15 min (2 exercices) | 8 exercices | Agents autonomes : daily digest, triage, Slack, onboarding |
| 03 | [n8n](https://evaneos.github.io/aico-teaching-support/n8n/) | 15 min (2 exercices) | 8 exercices | Automatisation visuelle : webhooks, API, AI Agent node |

## Comment ça marche

Chaque circuit est un **skill tree interactif** avec :

- **Mode Jour J** — exercices filtrés pour la session live du 25 mars
- **Mode Parcours complet** — tous les exercices pour approfondir en autonomie
- **Panel de détail** — étapes guidées, concepts clés inspectables, insights
- **Progression** — bouton "Marquer comme fait" persisté en localStorage
- **Mutations animées** — transitions de code entre exercices (Shiki Magic Move)

## Architecture

```
├── index.html              Landing page (Zone DRS)
├── shared/
│   ├── learning-map.css    Styles partagés (PIT STOP design system)
│   └── learning-map-engine.js  Moteur générique du skill tree
├── claude-code/
│   ├── index.html          Page du circuit
│   └── data.js             Données des 10 exercices
├── notion-agents/
│   ├── index.html
│   └── data.js             Données des 8 exercices
└── n8n/
    ├── index.html
    └── data.js             Données des 8 exercices
```

Le moteur (`learning-map-engine.js`) est **data-driven** : pour ajouter un circuit, il suffit de créer un `data.js` avec le même schéma et un `index.html` qui charge le moteur.

## Design system

Aligné sur le [PIT STOP Hub](https://github.com/Evaneos/pitstop/tree/main/pitstop-hub) :

- **Fond** : carbon `#0D0D0D` avec dot grid 24px
- **Accent** : neon `#00FF87`
- **Typo** : Oswald (headings, uppercase) + JetBrains Mono (labels, code)
- **Cards** : `#111111` avec bordure `#1E1E1E`, glow neon au hover

## Stack

- Vanilla HTML / CSS / JS — zéro build, zéro dépendance
- [Shiki](https://shiki.style/) + [Shiki Magic Move](https://github.com/shikijs/shiki-magic-move) (lazy-loaded depuis CDN) pour la coloration syntaxique et les animations de code
- Déployé sur GitHub Pages via GitHub Actions

## Développement local

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Origine

Approche pédagogique et moteur de skill tree inspirés de [langchain-learning](https://github.com/Evaneos/langchain-learning).
