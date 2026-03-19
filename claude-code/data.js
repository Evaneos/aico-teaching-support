// ════════════════════════════════════════════════════════════
// DATA — Exercise nodes and layer metadata for the Claude Code learning map
// Community Days / PIT STOP — Evaneos Hackathon
// 10 use-case-centric exercises across 3 layers
// ════════════════════════════════════════════════════════════

const EXERCISES = [
  {
    id: '01', section: 'trunk', title: 'Hello Claude Code', layer: 'basics', done: true, jourJ: true,
    concepts: 'installation, working directory, conversation, /help',
    insights: [
      '<strong>Claude Code travaille dans un WORKING DIRECTORY</strong> — il peut lire et modifier tous les fichiers de ce dossier. Cela le rend utile bien au-delà du code : specs, notes, données, présentations.',
      'Claude Code n\'est <strong>pas réservé aux devs</strong>. Un PM peut structurer des specs, un designer organiser des assets, un data scientist explorer des CSV. Le terminal est le point d\'entrée universel pour tout travail sur fichiers.',
      'La commande <code>/help</code> est votre <strong>carte du territoire</strong>. Elle révèle tout ce que Claude Code sait faire — y compris des fonctionnalités que vous ne soupçonnez pas encore.'
    ],
    steps: [
      { instruction: 'Vérifiez votre version de Node.js (>= 18 requis)', expected: 'Un numéro de version s\'affiche, ex: v20.11.0', copyable: 'node --version' },
      { instruction: 'Installez Claude Code via npm', expected: 'Installation terminée sans erreur', copyable: 'npm install -g @anthropic-ai/claude-code' },
      { instruction: 'Vérifiez que Claude Code est bien installé', expected: 'Le numéro de version de Claude Code s\'affiche', copyable: 'claude --version' },
      { instruction: 'Créez un répertoire de travail pour le hackathon et lancez Claude Code dedans', expected: 'L\'interface interactive de Claude Code s\'ouvre dans votre terminal', copyable: 'mkdir -p ~/hackathon-pitStop && cd ~/hackathon-pitStop && claude' },
      { instruction: 'Demandez à Claude de vous décrire le répertoire courant', expected: 'Claude analyse les fichiers présents (ou note que le dossier est vide) et décrit le contexte', copyable: 'Décris-moi ce que contient ce répertoire. Si c\'est vide, propose-moi ce qu\'on pourrait y construire.' },
      { instruction: 'Demandez à Claude de créer un fichier pour vous', expected: 'Claude crée le fichier et vous montre son contenu', copyable: 'Crée un fichier hello.md avec un message de bienvenue pour le hackathon PIT STOP d\'Evaneos' },
      { instruction: 'Explorez les commandes disponibles avec /help', expected: 'La liste des slash commands s\'affiche : /help, /config, /status, /compact, etc.', copyable: '/help' },
      { instruction: 'Quittez proprement la session', expected: 'La session se ferme et vous revenez au terminal', copyable: '/exit' }
    ],
    apis: [
      { name: 'claude',
        from: 'CLI',
        detail: 'La commande principale pour lancer Claude Code. Sans argument, elle ouvre une <strong>session interactive</strong> dans le working directory courant. Avec un argument, elle exécute une commande unique : <code>claude "Crée un fichier README.md"</code>. C\'est le point d\'entrée de toute interaction.' },
      { name: 'Working directory',
        from: 'concept',
        detail: 'Le répertoire depuis lequel vous lancez <code>claude</code>. C\'est le <strong>contexte implicite</strong> de toute conversation — Claude "voit" tous les fichiers de ce dossier et ses sous-dossiers. Changer de dossier avant de lancer Claude change complètement ce qu\'il peut faire. Un même Claude, deux dossiers différents = deux assistants différents.' },
      { name: '/help',
        from: 'commande interactive',
        detail: 'Affiche toutes les <strong>slash commands</strong> disponibles dans la session interactive. Les commandes commencent par <code>/</code> : <code>/help</code>, <code>/config</code>, <code>/status</code>, <code>/compact</code>, <code>/exit</code>. C\'est votre carte du territoire — à explorer en premier.' },
      { name: '/compact',
        from: 'commande interactive',
        detail: 'Résume la conversation en cours pour <strong>libérer de la fenêtre de contexte</strong>. Utile quand la conversation devient longue et que Claude commence à "oublier" le début. Le résumé est injecté comme nouveau contexte initial.' },
      { name: 'Conversation context',
        from: 'concept',
        detail: 'Claude maintient le contexte de toute la conversation en cours. Chaque message s\'ajoute à l\'historique — il se souvient de ce que vous avez dit et de ce qu\'il a fait. Le contexte est perdu quand vous quittez la session (sauf avec la mémoire, voir exercice 04).' }
    ],
    code: `# Installer Claude Code
npm install -g @anthropic-ai/claude-code

# Lancer dans un répertoire de travail
mkdir -p ~/hackathon-pitStop && cd ~/hackathon-pitStop
claude

# Dans la session interactive :
> Décris-moi la structure de ce projet
> Crée un fichier hello.md avec un message de bienvenue
> /help
> /compact
> /exit`,
    prereqs: [],
    shared: [
      { concept: 'working directory', targets: ['04', '05'] },
      { concept: 'conversation', targets: ['03', '04'] }
    ]
  },
  {
    id: '02', section: 'trunk', title: 'Plugins & Marketplace', layer: 'basics', done: true, jourJ: true,
    concepts: 'plugins, marketplaces, skills vs MCP servers, /plugin commands',
    insights: [
      'Un plugin est un <strong>bundle de skills + serveurs MCP</strong>. Les skills changent comment Claude <em>réfléchit</em>. Les serveurs MCP donnent à Claude de nouveaux <em>outils</em> pour agir. Installer un seul plugin peut vous donner <strong>20+ nouvelles capacités</strong> d\'un coup.',
      'Le marketplace est comme un <strong>App Store pour votre agent IA</strong>. Chaque plugin y est versionné, documenté, et installable en une commande. Pas de configuration manuelle, pas de clés API à gérer.',
      'La commande <code>/skills</code> révèle les <strong>modes de pensée</strong> disponibles. Chaque skill est un nouveau "mode" : brainstorming, debugging, review, TDD... Le même Claude, mais avec des lunettes différentes.'
    ],
    steps: [
      { instruction: 'Lancez Claude Code dans votre répertoire hackathon', expected: 'La session interactive s\'ouvre', copyable: 'cd ~/hackathon-pitStop && claude' },
      { instruction: 'Ajoutez le marketplace officiel de plugins', expected: 'Le marketplace est ajouté à la configuration, un message de confirmation s\'affiche', copyable: '/plugin marketplace add https://marketplace.claudecode.dev' },
      { instruction: 'Parcourez les plugins disponibles dans le marketplace', expected: 'Une liste de plugins s\'affiche avec leurs descriptions', copyable: '/plugin search' },
      { instruction: 'Installez le plugin "superpowers" (brainstorming, planning, debugging, review, TDD)', expected: 'Le plugin est téléchargé et ses skills sont disponibles', copyable: '/plugin install superpowers' },
      { instruction: 'Listez toutes les skills maintenant disponibles', expected: 'La liste inclut les skills superpowers : brainstorm, debug, review, plan, verify, tdd', copyable: '/skills' },
      { instruction: 'Explorez la description d\'une skill pour comprendre ce qu\'elle fait', expected: 'Vous voyez le détail de la skill : quand elle s\'active, ce qu\'elle change dans le comportement de Claude', copyable: 'Décris-moi en détail ce que fait la skill brainstorm et comment elle change ton comportement' },
      { instruction: 'Vérifiez l\'état de vos plugins installés', expected: 'La liste des plugins installés s\'affiche avec leur version et statut', copyable: '/plugin list' }
    ],
    apis: [
      { name: '/plugin marketplace add',
        from: 'commande interactive',
        detail: 'Ajoute une <strong>source de plugins</strong> (marketplace). Un marketplace est un registre distant qui liste des plugins disponibles. Une fois ajouté, vous pouvez parcourir et installer ses plugins. L\'URL officielle : <code>https://marketplace.claudecode.dev</code>.' },
      { name: '/plugin install',
        from: 'commande interactive',
        detail: 'Installe un plugin depuis un marketplace configuré. Le plugin est téléchargé et ses <strong>skills et serveurs MCP</strong> sont enregistrés. Syntaxe : <code>/plugin install nom-du-plugin</code>. Les nouvelles capacités sont disponibles immédiatement.' },
      { name: '/plugin search',
        from: 'commande interactive',
        detail: 'Parcourt les plugins disponibles dans les marketplaces configurés. Affiche le nom, la description et la version de chaque plugin. Permet de découvrir de nouvelles capacités avant de les installer.' },
      { name: '/skills',
        from: 'commande interactive',
        detail: 'Liste toutes les <strong>skills disponibles</strong> dans la session courante — celles installées via plugins et celles définies localement. Chaque skill a un nom, une description, et un trigger d\'activation. C\'est votre inventaire de "modes de pensée".' },
      { name: 'Skills vs MCP Servers',
        from: 'concept',
        detail: 'Distinction fondamentale : les <strong>skills</strong> sont des instructions en langage naturel qui changent <em>comment</em> Claude réfléchit (brainstorm, review, debug). Les <strong>serveurs MCP</strong> sont des services qui donnent à Claude de nouveaux <em>outils</em> pour agir (lire Notion, poster sur Slack, créer des PRs GitHub). Un plugin peut contenir les deux.' }
    ],
    code: `# Ajouter le marketplace officiel
/plugin marketplace add https://marketplace.claudecode.dev

# Parcourir les plugins disponibles
/plugin search

# Installer superpowers (brainstorm, debug, review, plan, TDD)
/plugin install superpowers

# Voir toutes les skills disponibles
/skills

# Lister les plugins installés
/plugin list

# Les skills changent la PENSÉE de Claude
# Les MCP servers ajoutent des OUTILS à Claude
# Un plugin bundle les deux`,
    prereqs: ['01'],
    shared: [
      { concept: 'skills', targets: ['03', '06', '07'] },
      { concept: 'plugins', targets: ['07'] }
    ]
  },
  {
    id: '03', section: 'trunk', title: 'Brainstorming Guidé', layer: 'skills', done: true, jourJ: true,
    concepts: 'brainstorming structuré, skills en action, pensée divergente/convergente',
    insights: [
      'Une skill ne donne pas de nouveaux outils à Claude — elle change <strong>COMMENT il réfléchit</strong>. Même Claude, même LLM, mais une skill de brainstorming le transforme en facilitateur qui pose des questions une par une, explore des axes, et converge vers une solution validée.',
      'Le brainstorming structuré suit un <strong>flow en 4 phases</strong> : clarification (questions), divergence (idées multiples), convergence (tri et priorisation), synthèse (plan d\'action). Claude guide chaque phase — vous ne faites que répondre et valider.',
      'Ce pattern "l\'agent guide, l\'humain valide" est <strong>le futur du travail assisté par IA</strong>. L\'agent structure la réflexion, vous apportez l\'expertise métier et les décisions.'
    ],
    steps: [
      { instruction: 'Lancez une session de brainstorming sur un sujet concret', expected: 'Claude entre en mode brainstorming : il pose une première question de clarification au lieu de répondre directement', copyable: '/brainstorm Comment pourrait-on améliorer l\'expérience de recherche de voyage sur Evaneos ?' },
      { instruction: 'Répondez à la question de clarification de Claude', expected: 'Claude pose une deuxième question pour affiner sa compréhension — il ne propose pas encore de solutions', copyable: 'On veut surtout améliorer le taux de conversion sur la page de résultats. Les utilisateurs semblent perdus quand il y a trop d\'options.' },
      { instruction: 'Laissez Claude passer en phase de divergence', expected: 'Claude propose plusieurs pistes d\'amélioration organisées par thèmes, sans les juger', copyable: 'OK, je pense que tu as assez de contexte. Propose-moi des pistes.' },
      { instruction: 'Demandez à Claude de converger et prioriser', expected: 'Claude organise les idées par impact/effort et recommande un plan d\'action priorisé', copyable: 'Très bien. Maintenant aide-moi à prioriser ces idées par impact et facilité de mise en œuvre.' },
      { instruction: 'Demandez une synthèse structurée du brainstorming', expected: 'Claude produit un document de synthèse avec le problème, les solutions retenues, et les prochaines étapes', copyable: 'Génère une synthèse complète de ce brainstorming dans un fichier brainstorm-recherche.md' },
      { instruction: 'Comparez avec une conversation sans skill : posez la même question directement', expected: 'Sans la skill, Claude répond d\'un bloc avec des suggestions génériques — pas de questions, pas de phases, pas de structure', copyable: 'Oublie le brainstorming précédent. Réponds directement : comment améliorer l\'expérience de recherche de voyage ?' }
    ],
    apis: [
      { name: '/brainstorm',
        from: 'skill superpowers',
        detail: 'Active le mode <strong>brainstorming structuré</strong>. Claude suit un flow en phases : clarification → divergence → convergence → synthèse. Il pose des questions une par une, ne saute pas aux solutions, et produit un livrable structuré. C\'est un exemple concret de skill qui change le <em>mode de pensée</em>, pas les outils.' },
      { name: 'Flow en phases',
        from: 'concept',
        detail: 'Le brainstorming suit un <strong>processus en 4 phases</strong> : <strong>1) Clarification</strong> — questions pour comprendre le vrai problème. <strong>2) Divergence</strong> — génération d\'idées sans jugement. <strong>3) Convergence</strong> — tri, priorisation, matrice impact/effort. <strong>4) Synthèse</strong> — document structuré avec plan d\'action.' },
      { name: 'Skill behavior change',
        from: 'concept',
        detail: 'Une skill modifie le <strong>system prompt dynamiquement</strong>. Quand <code>/brainstorm</code> est activé, des instructions supplémentaires sont injectées : "pose des questions avant de répondre", "sépare divergence et convergence", etc. Le même modèle, les mêmes outils — mais un comportement radicalement différent.' },
      { name: 'Résultat fichier',
        from: 'pattern',
        detail: 'Le brainstorming peut produire un <strong>fichier markdown structuré</strong> comme livrable. Claude utilise l\'outil <code>Write</code> pour créer le fichier dans le working directory. Ce fichier est versionnable, partageable, et réutilisable dans les exercices suivants.' }
    ],
    code: `# Lancer un brainstorming structuré
/brainstorm Comment améliorer l'onboarding des nouveaux développeurs ?

# Phase 1 — Claude pose des questions de clarification
# → "Combien de nouveaux devs par mois ?"
# → "Quel est le plus gros point de friction actuel ?"

# Phase 2 — Divergence : idées multiples sans jugement
# → Buddy system, documentation interactive, sandbox projet...

# Phase 3 — Convergence : priorisation
> Priorise ces idées par impact et effort

# Phase 4 — Synthèse : livrable structuré
> Génère une synthèse dans onboarding-plan.md

# SANS skill : Claude répond d'un bloc, sans structure
# AVEC skill : Claude GUIDE la réflexion phase par phase`,
    prereqs: ['02'],
    shared: [
      { concept: 'brainstorming', targets: ['09'] },
      { concept: 'skills en action', targets: ['06'] }
    ]
  },
  {
    id: '04', section: 'trunk', title: 'CLAUDE.md & Mémoire', layer: 'skills', done: true, jourJ: false,
    concepts: 'CLAUDE.md, mémoire projet, conventions, .claude/ directory',
    insights: [
      '<strong>CLAUDE.md est un README pour l\'IA</strong> — il indique à Claude les règles de VOTRE projet sans avoir à les répéter à chaque conversation. Conventions de code, architecture, interdictions : tout ce que vous diriez à un nouveau collègue qui rejoint l\'équipe.',
      'La mémoire de Claude <strong>persiste entre les conversations</strong>. Il construit sa compréhension au fil du temps — qui vous êtes, comment vous travaillez, ce qu\'il faut éviter. C\'est un collègue qui apprend, pas un outil qui repart de zéro.',
      'Il y a <strong>4 niveaux de mémoire</strong> : utilisateur (~/.claude/), projet (.claude/), CLAUDE.md (racine), et la conversation en cours. Chaque niveau a une portée différente — du global au local.'
    ],
    steps: [
      { instruction: 'Créez un fichier CLAUDE.md à la racine de votre répertoire hackathon', expected: 'Le fichier est créé avec des conventions claires', copyable: 'cat > ~/hackathon-pitStop/CLAUDE.md << \'EOF\'\n# Conventions PIT STOP Hackathon\n\n## Contexte\nCe répertoire contient les expérimentations du hackathon PIT STOP d\'Evaneos.\n\n## Règles\n- Écrire tous les messages et commentaires en français\n- Nommer les fichiers en kebab-case (ex: mon-fichier.md)\n- Toujours ajouter un header avec la date dans les fichiers markdown\n- Ne JAMAIS supprimer de fichiers sans confirmation explicite\n\n## Stack préférée\n- TypeScript pour le code\n- Markdown pour la documentation\n- JSON pour les données\nEOF' },
      { instruction: 'Lancez Claude Code et vérifiez qu\'il charge le CLAUDE.md', expected: 'Claude mentionne avoir lu le CLAUDE.md et connaît les conventions du projet', copyable: 'cd ~/hackathon-pitStop && claude\n> Quelles sont les conventions de ce projet ?' },
      { instruction: 'Testez que Claude respecte les conventions', expected: 'Claude nomme le fichier en kebab-case, écrit en français, et ajoute un header avec la date', copyable: 'Crée un fichier avec une liste de courses pour le déjeuner d\'équipe' },
      { instruction: 'Explorez le dossier .claude/ pour voir la mémoire locale', expected: 'Vous voyez les fichiers de mémoire et de configuration dans .claude/', copyable: 'ls -la ~/.claude/ && echo "---" && ls -la .claude/ 2>/dev/null || echo "Pas encore de .claude/ local"' },
      { instruction: 'Donnez un feedback à Claude pour enrichir sa mémoire', expected: 'Claude enregistre le feedback et l\'appliquera dans les futures conversations', copyable: 'Rappelle-toi : dans ce projet, je préfère les listes numérotées aux listes à puces. Retiens ça pour nos futures conversations.' },
      { instruction: 'Vérifiez que la mémoire a été mise à jour', expected: 'La mémoire contient votre préférence de listes numérotées', copyable: 'Qu\'est-ce que tu as retenu de mes préférences ?' }
    ],
    apis: [
      { name: 'CLAUDE.md',
        from: 'fichier de configuration',
        detail: 'Fichier markdown à la <strong>racine du projet</strong>, lu automatiquement par Claude au début de chaque conversation. Contient les conventions, l\'architecture, les interdictions, les patterns préférés. C\'est l\'équivalent d\'un <strong>system prompt persistant</strong> lié au projet. Chaque projet peut avoir son propre CLAUDE.md.' },
      { name: '.claude/',
        from: 'répertoire de configuration',
        detail: 'Répertoire contenant les fichiers de <strong>mémoire et configuration</strong> locaux au projet. Claude y stocke ce qu\'il apprend au fil des conversations — feedback reçu, décisions prises, contexte accumulé. Ce répertoire peut être versionné (git) pour partager la mémoire avec l\'équipe.' },
      { name: 'Types de mémoire',
        from: 'concept',
        detail: 'Quatre niveaux de mémoire : <strong>1) Utilisateur</strong> (<code>~/.claude/</code>) — préférences globales qui s\'appliquent partout. <strong>2) Projet</strong> (<code>.claude/</code>) — contexte spécifique au projet. <strong>3) CLAUDE.md</strong> — conventions et règles du projet. <strong>4) Conversation</strong> — contexte de la session en cours, perdu à la fermeture.' },
      { name: '/memory',
        from: 'commande interactive',
        detail: 'Permet de consulter et gérer la mémoire de Claude. Vous pouvez voir ce qu\'il a retenu, corriger des informations erronées, ou effacer des souvenirs obsolètes. La mémoire est <strong>transparente et contrôlable</strong> — pas de boîte noire.' }
    ],
    code: `# CLAUDE.md — lu automatiquement à chaque conversation

# Conventions Projet Evaneos

## Architecture
- Monorepo avec packages/ pour chaque module
- Shared types dans packages/common/

## Code style
- TypeScript strict, pas de any
- Fonctions fléchées, pas de function declarations
- Noms de variables en camelCase

## Interdictions
- Ne JAMAIS modifier .env.production
- Ne pas ajouter de dépendances sans validation humaine

## Mémoire
# ~/.claude/        → préférences globales (tous projets)
# .claude/          → mémoire projet (ce repo)
# CLAUDE.md         → conventions projet (lu au démarrage)`,
    prereqs: ['01'],
    shared: [
      { concept: 'CLAUDE.md', targets: ['06'] },
      { concept: 'working directory', targets: ['05'] }
    ]
  },
  {
    id: '05', section: 'trunk', title: 'Git Workflow Assisté', layer: 'basics', done: true, jourJ: false,
    concepts: 'git, /commit, branches, PR, GitHub plugin',
    insights: [
      'Claude lit votre <strong>git log pour imiter votre style de commit</strong>. Il ne s\'invente pas de conventions — il suit les vôtres. Si vos commits sont en français avec des emojis, les siens le seront aussi.',
      'Le workflow complet branch → commit → PR <strong>sans quitter le terminal</strong> réduit le context-switching. Vous restez dans le flow de pensée au lieu de jongler entre terminal, IDE et navigateur.',
      'Claude comprend le <strong>contexte git</strong> : il sait quels fichiers sont modifiés, quelles branches existent, et quel est l\'état du staging area. Il ne commite jamais à l\'aveugle.'
    ],
    steps: [
      { instruction: 'Initialisez un repo git dans votre répertoire hackathon', expected: 'Un repo git est créé avec un premier commit', copyable: 'cd ~/hackathon-pitStop && git init && git add -A && git commit -m "Initial commit: hackathon PIT STOP"' },
      { instruction: 'Demandez à Claude de créer une branche feature', expected: 'Claude crée la branche et bascule dessus', copyable: 'Crée une branche feature/amelioration-recherche et bascule dessus' },
      { instruction: 'Faites des modifications via Claude', expected: 'Claude crée ou modifie des fichiers pertinents', copyable: 'Crée un fichier recherche-v2.md avec les 3 améliorations principales qu\'on a identifiées en brainstorming' },
      { instruction: 'Utilisez /commit pour commiter avec un message généré', expected: 'Claude analyse les changements, propose un message de commit pertinent, et commite', copyable: '/commit' },
      { instruction: 'Vérifiez le log git pour voir le commit', expected: 'Le commit apparaît avec un message bien formaté qui suit vos conventions', copyable: 'git log --oneline -5' },
      { instruction: 'Demandez à Claude de préparer une Pull Request (si le repo a un remote GitHub)', expected: 'Claude génère un titre et une description de PR basés sur les changements de la branche', copyable: 'Prépare une Pull Request pour cette branche. Génère un titre et une description détaillée des changements.' },
      { instruction: 'Revenez sur la branche principale', expected: 'Vous êtes de retour sur main/master', copyable: 'git checkout main || git checkout master' }
    ],
    apis: [
      { name: '/commit',
        from: 'commande interactive',
        detail: 'Analyse les fichiers modifiés (staged et unstaged), génère un <strong>message de commit</strong> qui suit le style de votre git log existant, et effectue le commit. Claude détecte automatiquement les conventions : Conventional Commits, emojis, langue, longueur. Vous pouvez accepter, modifier ou refuser le message.' },
      { name: 'GitHub plugin',
        from: 'plugin anthropics/github',
        detail: 'Plugin officiel qui donne à Claude des outils pour interagir avec GitHub : <strong>créer des branches</strong>, <strong>ouvrir des PRs</strong>, <strong>gérer des issues</strong>, commenter du code. Transforme Claude en assistant GitHub complet sans quitter le terminal.' },
      { name: 'Git context',
        from: 'concept',
        detail: 'Claude a accès au <strong>contexte git complet</strong> : status, diff, log, branches, remotes. Il utilise ces informations pour comprendre l\'état du repo et proposer des actions pertinentes. C\'est pourquoi ses messages de commit sont bons — il voit le <em>diff</em>, pas juste les noms de fichiers.' },
      { name: 'Branch workflow',
        from: 'pattern',
        detail: 'Le pattern recommandé : <strong>1)</strong> Créer une branche feature. <strong>2)</strong> Travailler avec Claude dessus. <strong>3)</strong> Commiter avec <code>/commit</code>. <strong>4)</strong> Ouvrir une PR avec le plugin GitHub. Tout depuis la même session Claude — zéro context-switching.' }
    ],
    code: `# Initialiser un repo
git init && git add -A && git commit -m "Initial commit"

# Demander à Claude de gérer le workflow git
> Crée une branche feature/search-improvements
> [... faire des modifications ...]
> /commit
# → Claude analyse le diff et propose un message

# Vérifier le résultat
git log --oneline -5

# Préparer une PR (avec GitHub plugin)
> Ouvre une PR pour cette branche avec un résumé des changements

# Claude lit votre git log → imite votre style
# Claude lit le diff → message précis, pas générique`,
    prereqs: ['01'],
    shared: [
      { concept: 'git', targets: [] }
    ]
  },
  {
    id: '06', section: 'branches', title: 'Écrire une Skill Custom', layer: 'skills', done: true, jourJ: false,
    concepts: 'SKILL.md, frontmatter, activation triggers, skill testing, itération',
    insights: [
      'Une skill est <strong>juste un fichier markdown</strong>. Pas de code, pas d\'API, pas de SDK — des instructions en langage naturel pur qui changent le comportement de l\'agent. Si vous savez écrire un brief, vous savez écrire une skill.',
      'La partie la plus difficile d\'une skill n\'est pas de l\'écrire — c\'est de <strong>tester le trigger d\'activation</strong>. L\'agent doit reconnaître QUAND l\'utiliser automatiquement. Testez avec des formulations variées de la même demande.',
      'Écrire une skill, c\'est comme <strong>onboarder un nouveau collègue</strong> : vous lui décrivez la procédure, les cas limites, les erreurs à éviter. La qualité de la skill dépend de la qualité de vos instructions.'
    ],
    steps: [
      { instruction: 'Créez le répertoire pour votre skill personnalisée', expected: 'Le répertoire est créé dans .claude/skills/', copyable: 'mkdir -p ~/hackathon-pitStop/.claude/skills/meeting-notes' },
      { instruction: 'Créez le fichier SKILL.md avec le frontmatter et les instructions', expected: 'Le fichier est créé avec les métadonnées et une procédure structurée', copyable: 'cat > ~/hackathon-pitStop/.claude/skills/meeting-notes/SKILL.md << \'EOF\'\n---\nname: meeting-notes\ndescription: Transforme des notes brutes de réunion en compte-rendu structuré avec actions et décisions\n---\n\n# Compte-Rendu de Réunion\n\n## Quand activer\nQuand l\'utilisateur partage des notes de réunion, demande un compte-rendu, ou mentionne "meeting notes", "CR", "réunion".\n\n## Procédure\n1. Identifier les participants mentionnés\n2. Extraire les DÉCISIONS prises (pas les discussions)\n3. Extraire les ACTIONS avec responsable et deadline\n4. Résumer les points clés en 3-5 bullets\n5. Identifier les sujets NON résolus / à reprendre\n\n## Format de sortie\n### Réunion: [titre]\n**Date**: [date] | **Participants**: [liste]\n\n#### Décisions\n- [décision 1]\n\n#### Actions\n| Action | Responsable | Deadline |\n|--------|-------------|----------|\n| ...    | ...         | ...      |\n\n#### Points clés\n- ...\n\n#### Sujets ouverts\n- ...\n\n## Règles\n- Toujours demander la date si elle n\'est pas mentionnée\n- Les actions DOIVENT avoir un responsable\n- Maximum 5 points clés — être concis\n- Ne jamais inventer d\'information absente des notes\nEOF' },
      { instruction: 'Vérifiez que la skill est détectée par Claude Code', expected: 'Votre skill "meeting-notes" apparaît dans la liste', copyable: '/skills' },
      { instruction: 'Testez la skill avec des notes de réunion brutes', expected: 'Claude active la skill et produit un compte-rendu structuré avec décisions, actions et points clés', copyable: 'Voici mes notes de réunion :\n- Pierre propose de migrer vers React 19\n- Marie dit que les tests sont cassés depuis mardi\n- On décide de reporter la migration à S+2\n- TODO: Marie fixe les tests avant vendredi\n- TODO: Pierre prépare un POC React 19\n- Le budget Q2 est validé\n- On reparlera du refacto API au prochain sprint planning' },
      { instruction: 'Testez avec une formulation différente pour vérifier le trigger', expected: 'La skill s\'active aussi avec cette formulation alternative', copyable: 'J\'ai un CR de réunion à mettre au propre. Voici le brouillon : équipe a discuté de la roadmap Q2, décision de prioriser le mobile-first, Jean s\'occupe du design system, livraison prévue fin avril.' },
      { instruction: 'Affinez la skill en ajoutant une règle suite à vos tests', expected: 'Après modification du SKILL.md, le comportement s\'améliore', copyable: 'La skill meeting-notes marche bien mais je voudrais qu\'elle ajoute aussi un score de priorité (P0/P1/P2) à chaque action. Modifie le SKILL.md pour ajouter cette règle.' },
      { instruction: 'Testez une dernière fois pour valider l\'amélioration', expected: 'Les actions ont maintenant un score de priorité', copyable: 'Transforme ces notes en CR : on lance le projet migration DB, critique, deadline dans 2 semaines. Sophie gère le schema, Paul les tests de non-régression. Aussi : nettoyer les logs en staging (pas urgent).' }
    ],
    apis: [
      { name: 'SKILL.md frontmatter',
        from: 'convention Claude Code',
        detail: 'Le frontmatter YAML en tête du fichier définit les métadonnées : <code>name</code> (identifiant en minuscules avec tirets) et <code>description</code> (phrase courte décrivant quand utiliser la skill). Ces métadonnées sont injectées dans le <strong>system prompt</strong> — le corps du fichier n\'est chargé que quand la skill est activée.' },
      { name: 'Activation triggers',
        from: 'concept',
        detail: 'La section "Quand activer" du SKILL.md guide le modèle pour reconnaître les situations pertinentes. C\'est la partie la plus critique : <strong>trop large</strong> et la skill se déclenche à tort, <strong>trop étroit</strong> et elle n\'est jamais activée. Listez des mots-clés et des formulations variées.' },
      { name: 'Skill directory',
        from: 'convention',
        detail: 'Les skills sont organisées dans <code>.claude/skills/</code> (niveau projet) ou <code>~/.claude/skills/</code> (niveau utilisateur). Chaque skill a son propre dossier contenant un <code>SKILL.md</code>. Structure : <code>.claude/skills/ma-skill/SKILL.md</code>.' },
      { name: 'Itération de skill',
        from: 'pattern',
        detail: 'Le cycle de développement d\'une skill : <strong>1)</strong> Écrire le SKILL.md. <strong>2)</strong> Tester avec un cas concret. <strong>3)</strong> Tester avec des formulations variées. <strong>4)</strong> Affiner les instructions. <strong>5)</strong> Répéter. C\'est du <strong>prompt engineering itératif</strong> — la skill s\'améliore à chaque test.' }
    ],
    code: `# Structure d'une skill custom
.claude/skills/meeting-notes/SKILL.md

# Contenu du SKILL.md
---
name: meeting-notes
description: Transforme des notes brutes en CR structuré
---

# Compte-Rendu de Réunion

## Quand activer
Quand l'utilisateur partage des notes de réunion...

## Procédure
1. Identifier les participants
2. Extraire les DÉCISIONS
3. Extraire les ACTIONS (responsable + deadline)
4. Résumer en 3-5 bullets
5. Lister les sujets ouverts

## Règles
- Actions DOIVENT avoir un responsable
- Ne jamais inventer d'information absente

# Tester → Affiner → Répéter
# Une skill = du prompt engineering itératif`,
    prereqs: ['03', '04'],
    shared: [
      { concept: 'SKILL.md', targets: [] }
    ]
  },
  {
    id: '07', section: 'branches', title: 'MCP Servers : Notion & Slack', layer: 'skills', done: true, jourJ: false,
    concepts: 'MCP servers, Notion plugin, cross-tool workflows, skills vs tools',
    insights: [
      'Les serveurs MCP donnent à Claude des <strong>mains pour agir</strong> dans le monde extérieur — lire une page Notion, poster sur Slack, créer une issue GitHub. Les skills lui donnent un <strong>cerveau pour réfléchir</strong>. Les plugins bundlent les deux.',
      'Un workflow cross-tool depuis le terminal est <strong>incroyablement puissant</strong> : "Lis la spec dans Notion, génère le code, commite sur GitHub, et poste un résumé sur Slack" — une seule phrase, quatre outils.',
      'Les MCP servers suivent un <strong>protocole standard ouvert</strong>. N\'importe quel service peut exposer ses capacités à Claude via MCP. C\'est le USB-C des agents IA — un connecteur universel.'
    ],
    steps: [
      { instruction: 'Installez le plugin Notion pour Claude Code', expected: 'Le plugin Notion est installé avec ses outils MCP (lecture, écriture, recherche)', copyable: '/plugin install notion' },
      { instruction: 'Listez les nouveaux outils disponibles après installation', expected: 'Vous voyez les outils Notion : notion-search, notion-fetch, notion-create-pages, etc.', copyable: 'Quels nouveaux outils as-tu maintenant que le plugin Notion est installé ? Liste-les tous.' },
      { instruction: 'Recherchez une page dans votre workspace Notion', expected: 'Claude utilise l\'outil notion-search pour trouver des pages', copyable: 'Cherche dans Notion les pages qui parlent de "roadmap" ou "planning"' },
      { instruction: 'Lisez et résumez une page Notion', expected: 'Claude lit le contenu de la page et en fait un résumé structuré', copyable: 'Lis la page Notion que tu viens de trouver et fais-moi un résumé en 5 bullets des points clés' },
      { instruction: 'Créez un workflow cross-tool : Notion → fichier local', expected: 'Claude lit depuis Notion et écrit un fichier local structuré', copyable: 'Prends le contenu de cette page Notion et crée un fichier synthese-roadmap.md dans notre répertoire avec les informations restructurées' },
      { instruction: 'Comprenez la différence entre skills et MCP servers', expected: 'Claude explique clairement : skills = comportement, MCP = outils', copyable: 'Explique-moi la différence entre les skills et les MCP servers. Donne un exemple concret de chaque.' }
    ],
    apis: [
      { name: 'Plugin Notion',
        from: 'plugin makenotion/claude-code-notion-plugin',
        detail: 'Plugin officiel Notion qui donne à Claude des outils pour <strong>lire et écrire</strong> dans un workspace Notion : <code>notion-search</code> (chercher des pages), <code>notion-fetch</code> (lire une page), <code>notion-create-pages</code> (créer du contenu), <code>notion-update-page</code> (modifier). Nécessite une authentification OAuth.' },
      { name: 'MCP (Model Context Protocol)',
        from: 'concept',
        detail: 'Protocole standard ouvert qui permet à des services externes d\'exposer des <strong>outils (tools)</strong> et des <strong>ressources (resources)</strong> à un agent IA. Chaque MCP server est un petit service qui parle le protocole MCP. Claude Code peut se connecter à plusieurs MCP servers simultanément.' },
      { name: 'Cross-tool workflow',
        from: 'pattern',
        detail: 'Pattern où Claude enchaîne des outils de <strong>différents MCP servers</strong> dans un seul workflow : lire depuis Notion → transformer les données → écrire un fichier → commiter sur Git → notifier sur Slack. L\'orchestration est faite par Claude en langage naturel — pas de code d\'intégration.' },
      { name: 'Skills vs MCP Servers',
        from: 'concept',
        detail: 'Distinction clé : <strong>Skills</strong> = instructions markdown qui changent comment Claude <em>pense</em> (brainstorm, review, debug). <strong>MCP Servers</strong> = services qui donnent à Claude de nouveaux <em>outils</em> pour <em>agir</em> (lire Notion, poster Slack). Un plugin peut bundler les deux ensemble.' }
    ],
    code: `# Installer le plugin Notion
/plugin install notion

# Les outils MCP sont disponibles immédiatement
> Cherche dans Notion les pages sur la roadmap
# → utilise notion-search

> Lis cette page et résume-la
# → utilise notion-fetch

> Crée un fichier local avec la synthèse
# → utilise Write (outil natif)

# Workflow cross-tool en une phrase :
> Lis la spec dans Notion, génère le code,
> commite sur Git, et poste un résumé sur Slack

# Skills = cerveau (comment penser)
# MCP Servers = mains (comment agir)
# Plugins = bundle des deux`,
    prereqs: ['02'],
    shared: [
      { concept: 'MCP servers', targets: [] }
    ]
  },
  {
    id: '08', section: 'trunk', title: 'Subagents en Parallèle', layer: 'agents', done: true, jourJ: false,
    concepts: 'Agent tool, subagent dispatch, run_in_background, parallel execution, synthèse',
    insights: [
      'Les subagents sont comme <strong>assigner des tâches à des membres d\'équipe</strong> — chacun travaille indépendamment avec son propre contexte, et l\'agent principal coordonne et synthétise les résultats.',
      'L\'exécution <strong>parallèle</strong> avec <code>run_in_background: true</code> est le vrai game-changer. Au lieu de faire 3 recherches séquentielles (3x le temps), les 3 subagents travaillent simultanément.',
      'Chaque subagent a son <strong>propre contexte isolé</strong>. Il ne voit pas la conversation principale ni les autres subagents. C\'est une force : pas de pollution croisée, pas de confusion. Le résultat est propre.'
    ],
    steps: [
      { instruction: 'Comprenez le concept de subagents en demandant à Claude de l\'expliquer', expected: 'Claude explique les subagents : dispatch, isolation, parallélisme, synthèse', copyable: 'Explique-moi le concept de subagents. Quand les utiliser, comment ils fonctionnent, et quels sont leurs avantages par rapport au travail séquentiel ?' },
      { instruction: 'Lancez une recherche parallèle avec des subagents', expected: 'Claude dispatche plusieurs subagents qui travaillent en parallèle', copyable: 'Utilise des subagents en parallèle pour : 1) Analyser la structure de fichiers de ce répertoire 2) Lister les bonnes pratiques de documentation de projet 3) Suggérer une structure de dossiers idéale pour un projet hackathon' },
      { instruction: 'Observez la synthèse des résultats', expected: 'Claude combine les résultats des 3 subagents en une recommandation cohérente', copyable: 'Synthétise les résultats de ces 3 analyses en un plan d\'action concret' },
      { instruction: 'Lancez un subagent de type "researcher" pour explorer un sujet', expected: 'Le subagent explorer un sujet en profondeur pendant que vous continuez à travailler', copyable: 'Lance un subagent researcher pour explorer les meilleures pratiques de n8n workflows pendant que je continue à travailler ici' },
      { instruction: 'Testez les limites : un subagent qui modifie des fichiers', expected: 'Le subagent peut créer et modifier des fichiers dans le working directory', copyable: 'Lance un subagent pour créer une structure de projet complète dans un sous-dossier "demo/" avec README, src/, tests/, et des exemples de code' },
      { instruction: 'Demandez à Claude de comparer les résultats de multiples subagents', expected: 'Claude compare et contraste les analyses de chaque subagent', copyable: 'Lance 2 subagents en parallèle : un qui argumente POUR une architecture microservices, et un qui argumente POUR un monolithe. Puis compare leurs arguments.' }
    ],
    apis: [
      { name: 'Agent tool',
        from: 'outil interne Claude Code',
        detail: 'L\'outil que Claude utilise en interne pour créer des <strong>subagents</strong>. Chaque subagent reçoit une description de tâche et travaille indépendamment. Le résultat est remonté à l\'agent principal qui synthétise. Les subagents ont accès aux mêmes outils (lecture/écriture de fichiers, bash, etc.) mais dans un contexte isolé.' },
      { name: 'run_in_background',
        from: 'paramètre Agent tool',
        detail: 'Lance le subagent <strong>en arrière-plan</strong>. L\'agent principal continue de travailler pendant que le subagent exécute sa tâche. Les résultats sont récupérés quand le subagent termine. Permet une véritable <strong>exécution parallèle</strong> — 3 recherches en même temps au lieu de 3 séquentielles.' },
      { name: 'subagent_type',
        from: 'paramètre Agent tool',
        detail: 'Définit le type de subagent : <strong>researcher</strong> (explore, lit, analyse), <strong>coder</strong> (écrit et modifie du code), <strong>reviewer</strong> (vérifie et critique). Le type influence le comportement du subagent — sa "spécialisation".' },
      { name: 'Isolation de contexte',
        from: 'concept',
        detail: 'Chaque subagent a son <strong>propre contexte de conversation</strong>, séparé de l\'agent principal et des autres subagents. Il ne voit que sa description de tâche. Avantage : pas de pollution croisée. Inconvénient : il ne peut pas poser de questions à l\'utilisateur — il doit être autonome.' }
    ],
    code: `# L'agent principal coordonne, les subagents exécutent

# Dispatch parallèle — 3 tâches simultanées
> Analyse en parallèle :
> 1) la structure du projet
> 2) les bonnes pratiques de doc
> 3) la structure idéale

# En interne, Claude utilise :
# Agent tool × 3, chacun avec run_in_background: true

# Subagent de recherche en background
> Lance un researcher pour explorer les best practices n8n
# → Le subagent travaille pendant que vous continuez

# Subagent de modification
> Lance un subagent pour créer la structure demo/
# → Le subagent crée les fichiers de manière autonome

# Synthèse par l'agent principal
> Synthétise les résultats de tous les subagents
# → L'agent principal combine et priorise`,
    prereqs: ['02'],
    shared: [
      { concept: 'subagents', targets: ['09'] },
      { concept: 'parallel execution', targets: ['09'] }
    ]
  },
  {
    id: '09', section: 'branches', title: 'Plan & Execute', layer: 'agents', done: true, jourJ: false,
    concepts: 'plan mode, writing-plans skill, executing-plans skill, review checkpoints, vérification',
    insights: [
      '"Planifier puis exécuter" est <strong>la méthode de travail des ingénieurs senior</strong>. Le plan est la spec — les subagents sont l\'équipe d\'implémentation. Claude reproduit ce pattern naturellement avec les skills de planning.',
      'Les <strong>review checkpoints</strong> sont essentiels. Sans eux, un agent exécute un plan sans jamais valider avec vous. Avec eux, vous gardez le contrôle sur les décisions critiques — l\'agent propose, vous disposez.',
      'Le pattern Plan & Execute <strong>combine brainstorming + subagents</strong>. Le brainstorming produit la vision, le plan la découpe en étapes, les subagents l\'exécutent en parallèle. C\'est l\'orchestration complète.'
    ],
    steps: [
      { instruction: 'Activez le mode plan pour structurer une tâche complexe', expected: 'Claude entre en mode planification : il découpe la tâche en étapes avant de commencer l\'exécution', copyable: 'Planifie (sans exécuter) la création d\'un mini-site de présentation pour notre équipe PIT STOP. Il faut : une page d\'accueil, une page de présentation de chaque membre, et une page de résultats du hackathon.' },
      { instruction: 'Examinez et validez le plan proposé', expected: 'Claude présente un plan détaillé avec des étapes numérotées et attend votre validation', copyable: 'Le plan est bon, mais ajoute une étape de tests pour vérifier que tous les liens fonctionnent. Aussi, commence par la structure des dossiers avant le contenu.' },
      { instruction: 'Lancez l\'exécution du plan validé', expected: 'Claude exécute le plan étape par étape, potentiellement avec des subagents pour les tâches parallèles', copyable: 'OK, exécute ce plan. Pour les étapes indépendantes, utilise des subagents en parallèle.' },
      { instruction: 'Observez un checkpoint de review pendant l\'exécution', expected: 'Claude s\'arrête à un point de décision et vous demande de valider avant de continuer', copyable: 'Continue l\'exécution. Si tu arrives à un choix de design ou une décision d\'architecture, demande-moi avant de continuer.' },
      { instruction: 'Demandez une vérification du travail accompli', expected: 'Claude lance une phase de vérification et liste ce qui est fait vs ce qui reste', copyable: '/verify Vérifie que le plan a été correctement exécuté. Liste ce qui est terminé, ce qui reste, et les éventuels problèmes.' },
      { instruction: 'Faites un retour sur la qualité de l\'exécution', expected: 'Claude prend en compte le feedback pour les futures exécutions', copyable: 'La structure est bonne mais les fichiers HTML sont trop basiques. La prochaine fois, utilise un template plus riche avec du CSS inline.' }
    ],
    apis: [
      { name: 'Plan mode',
        from: 'skill superpowers',
        detail: 'Mode où Claude <strong>planifie avant d\'exécuter</strong>. Il décompose une tâche complexe en étapes ordonnées, identifie les dépendances entre étapes, et propose un plan structuré. L\'exécution ne commence qu\'après votre validation. Permet de garder le contrôle sur les tâches complexes.' },
      { name: '/verify',
        from: 'skill superpowers',
        detail: 'Lance une <strong>phase de vérification</strong> post-exécution. Claude revérifie le travail accompli, compare avec le plan initial, liste les écarts, et identifie les problèmes. C\'est le "code review" de l\'exécution — un filet de sécurité automatique.' },
      { name: 'Review checkpoints',
        from: 'concept',
        detail: 'Points d\'arrêt dans l\'exécution d\'un plan où Claude <strong>demande une validation humaine</strong> avant de continuer. Configurables : à chaque étape, uniquement aux décisions critiques, ou jamais. Le bon équilibre dépend de votre confiance dans le plan et de la réversibilité des actions.' },
      { name: 'Plan + Subagents',
        from: 'pattern',
        detail: 'Pattern avancé : le plan identifie les étapes <strong>parallélisables</strong>, et l\'exécution dispatche des subagents pour les étapes indépendantes. Le plan est le <em>quoi</em> et l\'<em>ordre</em>, les subagents sont le <em>comment</em> et le <em>parallélisme</em>. L\'agent principal orchestre et synthétise.' }
    ],
    code: `# Étape 1 — Planifier (sans exécuter)
> Planifie la création d'un mini-site de présentation
# → Claude produit un plan en 6 étapes avec dépendances

# Étape 2 — Valider et affiner le plan
> Ajoute une étape de tests. Commence par la structure.
# → Le plan est mis à jour

# Étape 3 — Exécuter avec subagents
> Exécute le plan. Parallélise ce qui est indépendant.
# → Subagents pour les pages, séquentiel pour la structure

# Étape 4 — Review checkpoint
# Claude s'arrête : "J'ai 2 options pour le layout..."
> Option A, avec la sidebar

# Étape 5 — Vérifier
/verify Le plan a-t-il été bien exécuté ?
# → Liste : ✅ fait, ⏳ en cours, ❌ manquant

# Le flow complet :
# Brainstorm → Plan → Execute → Verify → Feedback`,
    prereqs: ['03', '08'],
    shared: [
      { concept: 'plan mode', targets: [] }
    ]
  },
  {
    id: '10', section: 'branches', title: 'Hooks & Automatisation', layer: 'agents', done: true, jourJ: false,
    concepts: 'hooks, settings.json, PreToolUse, PostToolUse, automatisation event-driven',
    insights: [
      'Les hooks sont le pont entre <strong>"je veux que Claude fasse toujours X"</strong> et le fait que ça arrive vraiment. Plus besoin de répéter "lance les tests après chaque modif" — le hook le fait automatiquement.',
      'Les hooks exécutent <strong>VOS commandes shell</strong> en réponse aux actions de Claude. Ce n\'est pas de l\'IA — c\'est de l\'<strong>automatisation déterministe</strong> déclenchée par des événements IA. Fiable, prévisible, auditable.',
      'Le pattern event-driven (<code>PreToolUse</code>, <code>PostToolUse</code>) transforme Claude Code en <strong>système réactif</strong>. Chaque action de l\'agent émet un événement. Vous y attachez vos commandes. C\'est le même pattern que les git hooks — mais déclenché par l\'IA.'
    ],
    steps: [
      { instruction: 'Comprenez les types de hooks disponibles', expected: 'Vous identifiez les hooks principaux : PreToolUse (avant), PostToolUse (après), Notification', copyable: 'Explique-moi les différents types de hooks dans Claude Code. Quand chacun se déclenche, et quelles variables d\'environnement sont disponibles ?' },
      { instruction: 'Créez un settings.json avec un hook d\'audit (PreToolUse)', expected: 'Le hook est configuré et logge chaque action de Claude avant exécution', copyable: 'cat > ~/hackathon-pitStop/.claude/settings.json << \'EOF\'\n{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Edit|Write",\n        "command": "echo \\"[$(date +%H:%M:%S)] WRITE: $CLAUDE_TOOL_INPUT\\" >> .claude/audit.log"\n      }\n    ]\n  }\n}\nEOF' },
      { instruction: 'Testez le hook en demandant à Claude de modifier un fichier', expected: 'Le hook se déclenche et logge l\'action dans audit.log avant la modification', copyable: 'Crée un fichier test-hook.md avec du contenu de test' },
      { instruction: 'Vérifiez que le log d\'audit a été écrit', expected: 'Le fichier audit.log contient l\'entrée de la modification', copyable: 'cat .claude/audit.log' },
      { instruction: 'Ajoutez un hook PostToolUse pour auto-formater après chaque modification', expected: 'Le hook de formatage est ajouté dans settings.json', copyable: 'Modifie .claude/settings.json pour ajouter un hook PostToolUse qui affiche "✓ Fichier modifié" après chaque Edit ou Write' },
      { instruction: 'Créez un hook de garde-fou qui bloque certaines modifications', expected: 'Le hook PreToolUse retourne exit 1 pour bloquer la modification de fichiers protégés', copyable: 'Ajoute un hook PreToolUse avec le matcher "Edit|Write" qui bloque (exit 1) toute modification de fichiers dans un dossier "protected/". Crée le dossier protected/ avec un fichier dedans pour tester.' },
      { instruction: 'Testez le garde-fou en essayant de modifier un fichier protégé', expected: 'Claude est bloqué par le hook et ne peut pas modifier le fichier', copyable: 'Modifie le fichier protected/secret.md pour y ajouter du texte' },
      { instruction: 'Examinez la configuration complète de votre settings.json', expected: 'Vous voyez tous les hooks configurés avec leurs matchers et commandes', copyable: 'cat .claude/settings.json' }
    ],
    apis: [
      { name: 'settings.json',
        from: 'fichier de configuration',
        detail: 'Fichier JSON de configuration. Deux niveaux : <code>~/.claude/settings.json</code> (global) et <code>.claude/settings.json</code> (projet). Les settings projet <strong>surchargent</strong> les settings globaux. C\'est ici que vous définissez les hooks, les permissions, et les préférences de comportement.' },
      { name: 'PreToolUse',
        from: 'type de hook',
        detail: 'Se déclenche <strong>AVANT</strong> que Claude exécute un outil (Edit, Write, Bash...). Si la commande retourne <strong>exit 1</strong>, l\'action est <strong>bloquée</strong>. Variables disponibles : <code>$CLAUDE_TOOL_NAME</code>, <code>$CLAUDE_TOOL_INPUT</code>. Idéal pour les garde-fous et l\'audit.' },
      { name: 'PostToolUse',
        from: 'type de hook',
        detail: 'Se déclenche <strong>APRÈS</strong> l\'exécution d\'un outil. Ne peut pas bloquer — l\'action est déjà faite. Idéal pour les <strong>réactions automatiques</strong> : lancer les tests, formater le code, notifier une équipe, mettre à jour un dashboard.' },
      { name: 'Hook matcher',
        from: 'paramètre',
        detail: 'Expression régulière qui filtre sur quel outil le hook se déclenche. <code>"Edit|Write"</code> matche les outils d\'édition, <code>"Bash"</code> matche les commandes shell, <code>".*"</code> matche tout. Permet de cibler précisément les actions.' },
      { name: 'Variables d\'environnement',
        from: 'concept',
        detail: 'Les hooks reçoivent des variables d\'environnement : <code>$CLAUDE_TOOL_NAME</code> (nom de l\'outil), <code>$CLAUDE_TOOL_INPUT</code> (paramètres de l\'outil en JSON). Ces variables permettent de <strong>filtrer et réagir</strong> de manière fine aux actions de Claude.' }
    ],
    code: `# .claude/settings.json — hooks event-driven

{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "echo \\"[$(date)] $CLAUDE_TOOL_NAME\\" >> .claude/audit.log"
      },
      {
        "matcher": "Edit|Write",
        "command": "if echo \\"$CLAUDE_TOOL_INPUT\\" | grep -q 'protected/'; then exit 1; fi"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "npx prettier --write \\"$CLAUDE_FILE_PATH\\" 2>/dev/null"
      }
    ]
  }
}

# PreToolUse → AVANT l'action → peut BLOQUER (exit 1)
# PostToolUse → APRÈS l'action → peut RÉAGIR
# Commandes shell pures — pas d'IA, 100% déterministe`,
    prereqs: ['04'],
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
        legend: 'De la commande <code>claude</code> nue aux <strong>plugins et marketplace</strong> — le même outil, mais un écosystème entier de capacités.',
        before: `# Claude Code de base
claude

# Conversation libre — capacités natives uniquement
> Décris-moi ce projet
> Crée un fichier utils.ts
> /help

# Claude peut lire/écrire des fichiers, exécuter du bash
# Mais pas de brainstorming structuré, pas de Notion,
# pas de GitHub avancé — juste le LLM et ses outils natifs`,
        after: `# Claude Code + Marketplace + Plugins
/plugin marketplace add https://marketplace.claudecode.dev
/plugin install superpowers

# Maintenant :
/skills
# → brainstorm, debug, review, plan, verify, tdd

# 20+ nouvelles capacités d'un coup
# Skills = nouveaux modes de pensée
# MCP servers = nouveaux outils pour agir

# Même Claude, mais augmenté par l'écosystème`,
      },
    ],
  },
  {
    from: '02', to: '03',
    blocks: [
      {
        legend: 'De <strong>parcourir les skills</strong> à <strong>utiliser une skill en conversation</strong> — la différence entre voir le menu et commander le plat.',
        before: `# Parcourir les skills disponibles
/skills
# → brainstorm: Brainstorming structuré
# → debug: Debugging assisté
# → review: Code review
# → plan: Planification de tâches
# → verify: Vérification de résultats

# On SAIT que les skills existent
# Mais on ne les a pas encore UTILISÉES`,
        after: `# Utiliser une skill en conversation
/brainstorm Comment améliorer la recherche de voyage ?

# Phase 1 — Claude POSE DES QUESTIONS (pas de réponse directe !)
# → "Quel est le taux de conversion actuel ?"
# → "Qui sont les utilisateurs principaux ?"

# Phase 2 — Divergence : idées multiples
# Phase 3 — Convergence : priorisation
# Phase 4 — Synthèse : fichier structuré

# La skill change COMMENT Claude pense
# Sans skill → réponse directe en bloc
# Avec skill → processus guidé en phases`,
      },
    ],
  },
  {
    from: '03', to: '06',
    blocks: [
      {
        legend: '<strong>Utiliser</strong> une skill pré-installée → <strong>écrire</strong> sa propre skill — du consommateur au créateur.',
        before: `# Utiliser une skill installée via plugin
/brainstorm Comment améliorer l'onboarding ?

# Claude suit la procédure du plugin superpowers
# Le flow est prédéfini : clarification → divergence → ...
# Ça marche bien, mais c'est GÉNÉRIQUE
# Pas adapté à VOS processus spécifiques`,
        after: `# Créer SA propre skill
mkdir -p .claude/skills/meeting-notes

cat > .claude/skills/meeting-notes/SKILL.md << 'EOF'
---
name: meeting-notes
description: Transforme des notes brutes en CR structuré
---
## Quand activer
Quand l'utilisateur partage des notes de réunion...

## Procédure
1. Identifier les participants
2. Extraire les DÉCISIONS (pas les discussions)
3. Actions avec responsable + deadline + priorité
EOF

# Même mécanisme de skills, VOTRE procédure
# Un fichier markdown, pas du code
# Testable, itérable, partageable avec l'équipe`,
      },
    ],
  },
  {
    from: '08', to: '09',
    blocks: [
      {
        legend: 'Du <strong>dispatch ad-hoc</strong> de subagents au <strong>Plan & Execute</strong> structuré — de l\'improvisation à l\'orchestration.',
        before: `# Subagents ad-hoc — dispatch au besoin
> Lance 3 subagents en parallèle :
> 1) analyser la structure
> 2) lister les best practices
> 3) suggérer des améliorations

# Ça fonctionne, mais :
# - Pas de plan global
# - Pas de dépendances entre étapes
# - Pas de checkpoints de validation
# - L'humain ne contrôle pas le flow`,
        after: `# Plan & Execute — orchestration structurée

# 1. PLANIFIER (sans exécuter)
> Planifie la création du mini-site
# → Plan en 6 étapes avec dépendances

# 2. VALIDER le plan
> Ajoute les tests. Réordonne les étapes.

# 3. EXÉCUTER avec parallélisme intelligent
> Exécute. Parallélise ce qui est indépendant.
# → Subagents pour les étapes indépendantes

# 4. CHECKPOINTS humains aux décisions critiques
# → "J'ai 2 options pour le layout..."

# 5. VÉRIFIER le résultat
/verify Le plan est-il bien exécuté ?

# Plan = la spec. Subagents = l'équipe. Vous = le PM.`,
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
    tagline: 'Installation, exploration & Git workflows',
    buildsOn: 'Getting started<br>install, explore, plugins, Git',
    tooltip: '<strong>Basics</strong> couvre l\'installation, la prise en main, le système de plugins et le workflow Git assisté. Vous saurez installer Claude Code, enrichir ses capacités via le marketplace, et gérer votre code source sans quitter le terminal.'
  },
  skills: {
    label: 'Skills & Plugins',
    className: 'layer--skills',
    glowColor: 'var(--skills-glow)',
    lineColor: 'var(--skills-line)',
    tagline: 'Plugins, skills, mémoire & workflows cross-tools',
    buildsOn: 'Built on basics<br>brainstorming, CLAUDE.md, custom skills, MCP servers',
    tooltip: '<strong>Skills & Plugins</strong> vous apprend à utiliser les skills (brainstorming structuré), configurer la mémoire projet (CLAUDE.md), écrire vos propres skills, et connecter des outils externes (Notion, Slack) via MCP servers.'
  },
  agents: {
    label: 'Advanced Agents',
    className: 'layer--agents',
    glowColor: 'var(--agents-glow)',
    lineColor: 'var(--agents-line)',
    tagline: 'Subagents, plans & automatisation',
    buildsOn: 'Built on skills<br>parallel agents, Plan & Execute, hooks event-driven',
    tooltip: '<strong>Advanced Agents</strong> couvre l\'exécution parallèle avec subagents, l\'orchestration Plan & Execute avec review checkpoints, et l\'automatisation event-driven avec hooks. C\'est ici que Claude Code devient un véritable système multi-agent orchestré.'
  }
};
