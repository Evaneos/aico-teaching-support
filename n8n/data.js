/* ============================================================
   n8n Learning Path — Exercise Data
   Instance : evaneos-tech.app.n8n.cloud
   Community Days / PIT STOP — Evaneos Hackathon
   ============================================================ */

const EXERCISES = [
  /* ----------------------------------------------------------
     01 — Premier Workflow : Webhook → Slack
     ---------------------------------------------------------- */
  {
    id: '01',
    section: 'trunk',
    title: 'Premier Workflow : Webhook → Slack',
    layer: 'basics',
    done: true,
    jourJ: true,
    concepts: 'workflow, nodes, trigger, webhook, connections, activation, Slack, Test URL vs Production URL',
    prereqs: [],
    insights: [
      '<strong>Un workflow = une chaîne de briques visuelles.</strong> — Chaque node fait <em>une seule chose</em>. La puissance vient de la combinaison — comme des LEGO. Un <code>Webhook</code> reçoit, un <code>Edit Fields</code> transforme, un <code>Slack</code> notifie. Cette modularité permet de remplacer n\'importe quel maillon sans tout casser.',
      '<strong>Test URL vs Production URL : le piège du débutant.</strong> — La <em>Test URL</em> ne fonctionne que quand le workflow est ouvert dans l\'éditeur et que vous avez cliqué "Test workflow". La <em>Production URL</em> fonctionne 24/7 mais <strong>uniquement si le workflow est activé</strong> (toggle orange). Oublier d\'activer = pas de réponse, zéro erreur visible.',
      '<strong>Le Webhook est le pont universel.</strong> — N\'importe quel système capable de faire un <code>HTTP POST</code> peut déclencher votre workflow : un <code>curl</code>, un formulaire, un autre workflow, GitHub, Slack, Notion... C\'est le point d\'entrée le plus polyvalent de n8n.'
    ],
    steps: [
      {
        instruction: 'Ouvrez <a href="https://evaneos-tech.app.n8n.cloud" target="_blank">evaneos-tech.app.n8n.cloud</a> et créez un nouveau workflow via le bouton <strong>+ Add Workflow</strong>. Nommez-le <code>01 - Webhook Slack</code>.',
        expected: 'Un canvas vierge s\'affiche avec un node <em>Start</em> ou un message d\'accueil pour ajouter un premier node.'
      },
      {
        instruction: 'Supprimez le node Start s\'il existe. Cliquez sur <strong>+</strong> et ajoutez un node <strong>Webhook</strong>. Laissez la méthode sur <code>POST</code> et le path par défaut (ou personnalisez-le, ex : <code>hello-slack</code>).',
        expected: 'Le node Webhook apparaît sur le canvas. Dans son panneau, vous voyez une <em>Test URL</em> et une <em>Production URL</em>.'
      },
      {
        instruction: 'Ajoutez un node <strong>Edit Fields</strong> (anciennement "Set"). Connectez la sortie du Webhook à l\'entrée du Edit Fields. Ajoutez un champ <code>message</code> avec la valeur : <code>{{ "Reçu depuis le webhook : " + $json.text }}</code>.',
        expected: 'Le node Edit Fields est connecté au Webhook. L\'expression est visible dans le champ <em>Value</em>.'
      },
      {
        instruction: 'Ajoutez un node <strong>Slack</strong> (action : <em>Send a Message</em>). Connectez le Edit Fields au Slack. Sélectionnez le credential Slack déjà configuré sur l\'instance, choisissez un channel de test (ex : <code>#hackathon-n8n</code>), et mettez <code>{{ $json.message }}</code> comme texte du message.',
        expected: 'Le node Slack est connecté. Le workflow forme une chaîne linéaire : <strong>Webhook → Edit Fields → Slack</strong>.'
      },
      {
        instruction: 'Cliquez sur <strong>Test workflow</strong> (bouton en haut). Le workflow attend maintenant un appel. Ouvrez un terminal et exécutez la commande curl ci-dessous en remplaçant l\'URL par la <em>Test URL</em> affichée dans le node Webhook.',
        expected: 'Le workflow s\'exécute. Chaque node passe au vert. Un message apparaît dans le channel Slack avec le texte envoyé.',
        copyable: 'curl -X POST <VOTRE_TEST_URL> \\\n  -H "Content-Type: application/json" \\\n  -d \'{"text": "Hello n8n depuis le hackathon !"}\''
      },
      {
        instruction: 'Observez le panneau <strong>Output</strong> de chaque node en cliquant dessus. Notez comment les données se transforment d\'un node à l\'autre : le Webhook reçoit le body brut, le Edit Fields produit un champ <code>message</code> formaté, et le Slack confirme l\'envoi.',
        expected: 'Vous comprenez le flux de données : chaque node reçoit les données du node précédent via <code>$json</code>.'
      },
      {
        instruction: 'Activez le workflow via le toggle <strong>Active</strong> en haut à droite. Relancez la commande curl en remplaçant la Test URL par la <em>Production URL</em>.',
        expected: 'Le workflow est actif (toggle orange). Le message Slack arrive même sans avoir le workflow ouvert dans l\'éditeur. Votre premier workflow est en production !'
      }
    ],
    apis: [
      { name: 'Webhook node', from: 'n8n built-in', detail: 'Point d\'entrée HTTP pour déclencher un workflow. Expose une <strong>Test URL</strong> (active uniquement quand le workflow est ouvert et en écoute) et une <strong>Production URL</strong> (active quand le workflow est activé). Supporte <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>. Les données du body sont accessibles directement via <code>$json</code> (ex : <code>$json.name</code>). Si le webhook est configuré pour renvoyer la requête complète (<em>Output: Full Request</em>), les données sont alors dans <code>$json.body</code>, <code>$json.headers</code>, et <code>$json.query</code>.' },
      { name: 'Edit Fields node', from: 'n8n built-in', detail: 'Permet de créer, modifier ou supprimer des champs dans les données. Anciennement appelé "Set node". Utilise les <strong>expressions n8n</strong> (<code>{{ }}</code>) pour accéder dynamiquement aux données des nodes précédents. Idéal pour préparer les données avant de les envoyer à un service.' },
      { name: 'Slack node', from: 'n8n integration', detail: 'Envoie des messages, réagit, crée des channels, ou lit des conversations Slack. Nécessite un credential OAuth configuré dans l\'instance. Supporte le <strong>Block Kit</strong> pour des messages riches et les <em>threads</em> pour les réponses contextuelles.' },
      { name: 'Connections', from: 'n8n concept', detail: 'Les liens entre les nodes définissent le flux de données. Les données sortantes d\'un node deviennent les données entrantes du suivant, accessibles via <code>$json</code>. Un node peut avoir plusieurs sorties (ex : IF node) et plusieurs entrées.' },
      { name: 'Workflow activation', from: 'n8n concept', detail: 'Un workflow inactif ne s\'exécute que manuellement ou via la Test URL. L\'<strong>activation</strong> (toggle orange) permet l\'exécution automatique via les triggers : Webhook Production URL, Schedule Trigger, Slack Trigger, etc. Sans activation, les triggers ne se déclenchent pas.' },
      { name: 'Credentials', from: 'n8n concept', detail: 'Les <strong>credentials</strong> stockent les clés d\'API et tokens d\'authentification de manière sécurisée. Vous les trouverez dans <em>Settings → Credentials</em>. Sur l\'instance du hackathon, les credentials Slack, Notion, GitHub et Anthropic sont <strong>déjà pré-configurés</strong> — il suffit de les sélectionner dans les nodes.' }
    ],
    shared: [
      { concept: 'Webhook', targets: ['02', '03', '05'] },
      { concept: 'Slack node', targets: ['03', '06'] }
    ]
  },

  /* ----------------------------------------------------------
     02 — Formulaire → Notion
     ---------------------------------------------------------- */
  {
    id: '02',
    section: 'trunk',
    title: 'Formulaire → Notion',
    layer: 'basics',
    done: true,
    jourJ: true,
    concepts: 'Edit Fields, expressions, Notion node, data mapping, JSON structure, formulaire webhook',
    prereqs: ['01'],
    insights: [
      '<strong>Les expressions <code>{{ }}</code> sont le ciment entre vos nodes.</strong> — Sans elles, chaque node serait un îlot isolé. Avec <code>{{ $json.email }}</code>, vous tissez un fil invisible entre le Webhook et le Notion node. Astuce : cliquez sur l\'icône engrenage d\'un champ pour basculer entre mode fixe et mode expression.',
      '<strong>Attention à la structure de <code>$json</code> !</strong> — Par défaut, un Webhook place les champs du body directement dans <code>$json</code> (ex : <code>$json.email</code>). <em>Attention :</em> si le webhook est configuré en mode <strong>Output: Full Request</strong>, les données sont alors dans <code>$json.body</code>. Après un Edit Fields, les champs produits sont toujours directement dans <code>$json</code>. <strong>Conseil :</strong> vérifiez toujours l\'onglet <em>Output</em> d\'un node avant de référencer ses données.',
      '<strong>Notion = base de données structurée gratuite.</strong> — Contrairement à un Google Sheet, une base Notion a des types de colonnes stricts (texte, email, URL, select...). Le mapping entre vos données et ces colonnes vous force à penser la structure — c\'est un bon réflexe d\'ingénierie des données.'
    ],
    steps: [
      {
        instruction: 'Créez un nouveau workflow <code>02 - Formulaire Notion</code>. Ajoutez un node <strong>Webhook</strong> (POST). Ce webhook simulera la réception de données d\'un formulaire avec les champs <code>name</code>, <code>email</code>, et <code>message</code>.',
        expected: 'Le node Webhook est prêt. La Test URL est disponible pour les tests.'
      },
      {
        instruction: 'Ajoutez un node <strong>Edit Fields</strong> connecté au Webhook. Configurez trois champs : <code>contactName</code> = <code>{{ $json.name }}</code>, <code>contactEmail</code> = <code>{{ $json.email }}</code>, <code>contactMessage</code> = <code>{{ $json.message }}</code>. Cela normalise les noms de champs.',
        expected: 'Le node Edit Fields affiche trois champs mappés. Les expressions font référence aux données du webhook.'
      },
      {
        instruction: 'Testez le webhook avec la commande curl ci-dessous. Inspectez le panneau <strong>Output</strong> du Edit Fields pour vérifier que les données sont bien transformées.',
        expected: 'Le Output du Edit Fields affiche : <code>{ contactName: "Marie Dupont", contactEmail: "marie@example.com", contactMessage: "Bonjour depuis le hackathon" }</code>.',
        copyable: 'curl -X POST <VOTRE_TEST_URL> \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name": "Marie Dupont", "email": "marie@example.com", "message": "Bonjour depuis le hackathon"}\''
      },
      {
        instruction: 'Ajoutez un node <strong>Notion</strong> (action : <em>Create a Database Page</em>). Sélectionnez le credential Notion configuré sur l\'instance. Choisissez une base de données de test (ou créez-en une avec les colonnes : <code>Name</code> (title), <code>Email</code> (email), <code>Message</code> (rich text), <code>Date</code> (date)).',
        expected: 'Le node Notion est connecté au Edit Fields. La base de données cible est sélectionnée et les propriétés sont visibles.'
      },
      {
        instruction: 'Mappez les propriétés Notion : <code>Name</code> → <code>{{ $json.contactName }}</code>, <code>Email</code> → <code>{{ $json.contactEmail }}</code>, <code>Message</code> → <code>{{ $json.contactMessage }}</code>, <code>Date</code> → <code>{{ $now.toISODate() }}</code>. Notez l\'usage de <code>$now</code> pour la date courante.',
        expected: 'Chaque propriété Notion est associée à une expression. L\'expression <code>$now</code> injecte la date du jour automatiquement.'
      },
      {
        instruction: 'Relancez le test complet : cliquez sur "Test workflow", envoyez le curl, puis vérifiez dans Notion qu\'une nouvelle page a été créée avec les bonnes données.',
        expected: 'Une nouvelle page apparaît dans la base Notion avec les champs correctement remplis et la date du jour.'
      },
      {
        instruction: 'Ajoutez un node <strong>Respond to Webhook</strong> en sortie du node Notion. Configurez-le pour renvoyer un JSON de confirmation : <code>{{ JSON.stringify({ success: true, notionPageId: $json.id }) }}</code>. Cela permet à l\'appelant de recevoir une réponse.',
        expected: 'Le curl reçoit maintenant une réponse JSON avec l\'ID de la page Notion créée, au lieu du message par défaut "Workflow was started".'
      }
    ],
    apis: [
      { name: 'Notion node', from: 'n8n integration', detail: 'Interagit avec l\'API Notion : créer des pages, lire des bases de données, mettre à jour des propriétés. Le mapping des propriétés doit respecter les <strong>types de colonnes</strong> de la base (title, rich_text, email, date, select, etc.). Utilise un credential OAuth ou une Internal Integration.' },
      { name: 'Expressions n8n', from: 'n8n concept', detail: 'Syntaxe <code>{{ }}</code> permettant d\'injecter dynamiquement des valeurs. Accès au node précédent via <code>$json</code>, à des nodes spécifiques via <code>$(\'Node Name\').item.json</code>, à la date via <code>$now</code>, et aux métadonnées d\'exécution via <code>$execution</code>. Les expressions supportent le JavaScript complet.' },
      { name: 'Respond to Webhook', from: 'n8n built-in', detail: 'Permet de personnaliser la réponse HTTP renvoyée à l\'appelant du webhook. Sans ce node, le webhook renvoie un simple <code>{"message": "Workflow was started"}</code>. Avec lui, vous contrôlez le status code, les headers, et le body de la réponse.' },
      { name: 'Data mapping', from: 'n8n concept', detail: 'Le processus de faire correspondre les champs de vos données aux champs attendus par un service. Essentiel avec Notion, Airtable, ou tout service avec un schéma strict. L\'onglet <strong>Input/Output</strong> de chaque node est votre meilleur outil de débogage.' }
    ],
    shared: [
      { concept: 'Expressions', targets: ['03', '04', '05'] }
    ]
  },

  /* ----------------------------------------------------------
     03 — GitHub → Slack : Notifications d'Équipe
     ---------------------------------------------------------- */
  {
    id: '03',
    section: 'trunk',
    title: 'GitHub → Slack : Notifications d\'Équipe',
    layer: 'integration',
    done: true,
    jourJ: false,
    concepts: 'GitHub Trigger, IF node, conditional routing, template formatting, event-driven automation',
    prereqs: ['01'],
    insights: [
      '<strong>Le IF node est votre gardien.</strong> — Sans filtrage, votre channel Slack se transforme en torrent de bruit. Le IF node vous permet d\'être chirurgical : ne notifier que les PR, ignorer les issues, filtrer par label. Un bon workflow est un workflow qui sait <em>ne pas</em> s\'exécuter.',
      '<strong>Les triggers "event-driven" vs "polling".</strong> — Le GitHub Trigger utilise des <strong>webhooks</strong> : GitHub appelle n8n instantanément quand l\'événement se produit. C\'est différent d\'un Schedule Trigger qui irait vérifier toutes les 5 minutes. Event-driven = temps réel + moins de charge.',
      '<strong>Formatez vos messages Slack comme un pro.</strong> — Slack supporte le <em>mrkdwn</em> (pas Markdown standard !) : <code>*gras*</code>, <code>_italique_</code>, <code>`code`</code>, <code><url|texte></code> pour les liens. Un message bien formaté, c\'est la différence entre une notif qu\'on lit et une qu\'on ignore.'
    ],
    steps: [
      {
        instruction: 'Créez un workflow <code>03 - GitHub Slack Notifs</code>. Ajoutez un node <strong>GitHub Trigger</strong>. Sélectionnez le credential GitHub de l\'instance. Choisissez un repository de test et l\'événement <code>pull_request</code>.',
        expected: 'Le node GitHub Trigger est configuré. Il écoute les événements pull_request sur le repository sélectionné.'
      },
      {
        instruction: 'Ajoutez également l\'événement <code>issue_comment</code> au trigger pour capturer les commentaires sur les PR. Le trigger émettra des données différentes selon le type d\'événement.',
        expected: 'Le trigger écoute deux événements. Vous pouvez voir les différents payloads attendus dans la documentation GitHub.'
      },
      {
        instruction: 'Ajoutez un node <strong>IF</strong> connecté au trigger. Configurez la condition : <code>{{ $json.action }}</code> est égal à <code>opened</code> (pour ne notifier que les nouvelles PR, pas les updates ou closes).',
        expected: 'Le IF node crée deux branches : <em>true</em> (nouvelle PR ouverte) et <em>false</em> (autres actions qu\'on ignore).'
      },
      {
        instruction: 'Sur la branche <strong>true</strong>, ajoutez un node <strong>Edit Fields</strong> pour préparer le message. Créez un champ <code>slackMessage</code> avec le template ci-dessous.',
        expected: 'Le Edit Fields produit un message Slack formaté avec le titre de la PR, l\'auteur, et un lien cliquable.',
        copyable: '🔀 *Nouvelle PR* : <{{ $json.pull_request.html_url }}|{{ $json.pull_request.title }}>\n👤 Auteur : {{ $json.pull_request.user.login }}\n📦 Repo : {{ $json.repository.full_name }}\n📝 {{ $json.pull_request.body ? $json.pull_request.body.substring(0, 200) + "..." : "Pas de description" }}'
      },
      {
        instruction: 'Connectez le Edit Fields à un node <strong>Slack</strong> (Send a Message). Choisissez votre channel d\'équipe et utilisez <code>{{ $json.slackMessage }}</code> comme texte du message.',
        expected: 'Le workflow complet est : GitHub Trigger → IF (filtre) → Edit Fields (formatage) → Slack (envoi).'
      },
      {
        instruction: 'Testez le workflow : activez-le, puis créez une Pull Request sur le repository GitHub configuré. Vérifiez que la notification arrive dans Slack avec le bon formatage.',
        expected: 'La notification Slack apparaît en quelques secondes avec le titre de la PR, le lien cliquable, l\'auteur, et un extrait de la description.'
      },
      {
        instruction: '<strong>Bonus :</strong> Dupliquez le Edit Fields sur la branche <em>false</em> du IF et ajoutez un second IF pour filtrer les <code>issue_comment</code> sur les PR. Cela vous permet de notifier aussi les commentaires de review.',
        expected: 'Le workflow gère deux cas : les nouvelles PR (branche principale) et les commentaires de review (branche secondaire).'
      }
    ],
    apis: [
      { name: 'GitHub Trigger', from: 'n8n integration', detail: 'Déclenche le workflow sur des événements GitHub en temps réel : <code>pull_request</code>, <code>push</code>, <code>issue_comment</code>, <code>release</code>, etc. Utilise les <strong>webhooks GitHub</strong> configurés automatiquement par n8n. Le payload varie selon l\'événement — consultez la doc GitHub pour la structure.' },
      { name: 'IF node', from: 'n8n built-in', detail: 'Évalue une condition et route les données vers la branche <strong>true</strong> ou <strong>false</strong>. Supporte les comparaisons de strings, nombres, booléens, et les expressions complexes. C\'est le <code>if/else</code> du no-code. Plusieurs conditions peuvent être combinées avec AND/OR.' },
      { name: 'Formatage Slack mrkdwn', from: 'Slack concept', detail: 'Slack utilise son propre format "mrkdwn" (pas Markdown) : <code>*gras*</code>, <code>_italique_</code>, <code>~barré~</code>, <code>`code`</code>, <code>```bloc```</code>, et <code>&lt;url|texte&gt;</code> pour les liens. Les blocs avancés utilisent le <a href="https://app.slack.com/block-kit-builder" target="_blank">Block Kit Builder</a>.' },
      { name: 'Event-driven triggers', from: 'n8n concept', detail: 'Les triggers événementiels (GitHub, Slack, Notion...) s\'exécutent <strong>instantanément</strong> quand l\'événement se produit, contrairement aux triggers par polling (Schedule) qui vérifient périodiquement. Avantages : temps réel, moins de charge, pas de données manquées entre deux polls.' }
    ],
    shared: []
  },

  /* ----------------------------------------------------------
     04 — Pipeline de Données Récurrent
     ---------------------------------------------------------- */
  {
    id: '04',
    section: 'trunk',
    title: 'Pipeline de Données Récurrent',
    layer: 'integration',
    done: true,
    jourJ: false,
    concepts: 'Schedule Trigger, HTTP Request, Code node, cron expressions, data transformation, daily digest',
    prereqs: ['01'],
    insights: [
      '<strong>Le Code node est votre échappatoire quand le no-code ne suffit plus.</strong> — JavaScript ou Python, accès complet aux données. Mais gardez-le court : si votre Code node dépasse 30 lignes, demandez-vous s\'il faudrait plutôt utiliser plusieurs nodes ou coder un vrai service. Le Code node est un pont, pas une destination.',
      '<strong>Les expressions cron sont un superpouvoir.</strong> — <code>0 9 * * 1-5</code> signifie "à 9h00, du lundi au vendredi". Ce format existe depuis les années 70 (Unix) et il est partout : n8n, GitHub Actions, Kubernetes, AWS... L\'apprendre une fois, c\'est l\'utiliser partout.',
      '<strong>Attention aux fuseaux horaires !</strong> — L\'instance n8n utilise le fuseau configuré dans les settings (souvent UTC). Si vous programmez un digest à 9h, vérifiez que c\'est bien 9h heure de Paris (UTC+1/UTC+2 selon l\'heure d\'été). Astuce : vérifiez dans <em>Settings → General</em>.'
    ],
    steps: [
      {
        instruction: 'Créez un workflow <code>04 - Daily Digest</code>. Ajoutez un node <strong>Schedule Trigger</strong>. Configurez-le en mode <em>Cron</em> avec l\'expression ci-dessous pour un déclenchement tous les jours ouvrés à 9h.',
        expected: 'Le node Schedule Trigger affiche la prochaine exécution planifiée. Le workflow se déclenchera automatiquement une fois activé.',
        copyable: '0 9 * * 1-5'
      },
      {
        instruction: 'Ajoutez un node <strong>HTTP Request</strong> connecté au Schedule Trigger. Configurez-le en <code>GET</code> vers l\'URL ci-dessous. Cette API retourne des données JSON que nous utiliserons comme source pour le digest.',
        expected: 'Le node HTTP Request est connecté au Schedule Trigger. L\'URL est configurée. Testez-le en cliquant sur "Execute Node" pour voir les données.',
        copyable: 'https://jsonplaceholder.typicode.com/posts?_limit=5'
      },
      {
        instruction: 'Ajoutez un second node <strong>HTTP Request</strong>, aussi connecté au Schedule Trigger (en parallèle du premier). Configurez-le vers l\'URL ci-dessous pour récupérer une seconde source de données.',
        expected: 'Deux nodes HTTP Request partent du Schedule Trigger en parallèle. n8n exécutera les deux appels simultanément.',
        copyable: 'https://jsonplaceholder.typicode.com/todos?_limit=10'
      },
      {
        instruction: 'Ajoutez un node <strong>Merge</strong> (mode : <em>Append</em>) connecté aux deux HTTP Request. Cela combine les données des deux sources en un seul flux.',
        expected: 'Le node Merge reçoit les deux sources et produit une liste combinée d\'items.'
      },
      {
        instruction: 'Ajoutez un node <strong>Code</strong> (JavaScript) connecté au Merge. Collez le code ci-dessous pour agréger les données en un digest structuré.',
        expected: 'Le node Code produit un objet unique avec la date, le nombre de posts, les titres des top posts, et les statistiques de todos.',
        copyable: "const items = $input.all();\nconst posts = items.filter(item => item.json.title && !item.json.hasOwnProperty('completed'));\nconst todos = items.filter(item => item.json.hasOwnProperty('completed'));\n\nconst digest = {\n  date: new Date().toLocaleDateString('fr-FR', {\n    weekday: 'long',\n    day: 'numeric',\n    month: 'long',\n    year: 'numeric'\n  }),\n  postsCount: posts.length,\n  topPosts: posts.slice(0, 3).map(p => p.json.title),\n  pendingTodos: todos.filter(t => !t.json.completed).length,\n  completedTodos: todos.filter(t => t.json.completed).length,\n  completionRate: Math.round(\n    (todos.filter(t => t.json.completed).length / todos.length) * 100\n  )\n};\n\nreturn [{ json: digest }];"
      },
      {
        instruction: 'Ajoutez un node <strong>Slack</strong> connecté au Code node. Utilisez le template ci-dessous pour formater un digest lisible dans Slack.',
        expected: 'Le node Slack envoie un message formaté avec les statistiques agrégées. Le digest est clair et structuré.',
        copyable: '📊 *Daily Digest — {{ $json.date }}*\n\n📝 *{{ $json.postsCount }} articles récents*\n• {{ $json.topPosts.join("\\n• ") }}\n\n✅ {{ $json.completedTodos }} terminés | ⏳ {{ $json.pendingTodos }} en cours\n📈 Taux de complétion : {{ $json.completionRate }}%'
      },
      {
        instruction: 'Testez le workflow complet en cliquant sur "Test workflow". Vérifiez que chaque node s\'exécute correctement (vert) et que le message Slack est bien formaté. Une fois satisfait, <strong>activez</strong> le workflow.',
        expected: 'Le digest apparaît dans Slack avec toutes les données. Le workflow est activé et s\'exécutera automatiquement chaque jour ouvré à 9h.'
      }
    ],
    apis: [
      { name: 'Schedule Trigger', from: 'n8n built-in', detail: 'Déclenche un workflow selon un planning. Supporte les intervalles simples (toutes les heures) et les expressions <strong>cron</strong> pour un contrôle précis. Format cron : <code>minute heure jour-du-mois mois jour-de-la-semaine</code>. Exemples : <code>0 9 * * 1-5</code> = 9h en semaine, <code>*/15 * * * *</code> = toutes les 15 min.' },
      { name: 'HTTP Request node', from: 'n8n built-in', detail: 'Effectue des appels HTTP vers n\'importe quelle API REST. Supporte <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, les headers personnalisés, l\'authentification (Bearer, Basic, OAuth), et les expressions dans l\'URL et le body. Gère automatiquement le parsing JSON des réponses.' },
      { name: 'Code node', from: 'n8n built-in', detail: 'Exécute du <strong>JavaScript</strong> ou <strong>Python</strong> dans le workflow. Accès aux données via <code>$input.all()</code> (tous les items) ou <code>$input.first()</code> (premier item). Doit retourner un tableau d\'objets <code>[{ json: {...} }]</code>. Environnement sandboxé — pas d\'accès filesystem ou réseau.' },
      { name: 'Merge node', from: 'n8n built-in', detail: 'Combine les données de plusieurs branches en une seule sortie. Mode <em>Append</em> : concatène les items. Mode <em>Combine &gt; Matching Fields</em> : jointure sur un champ commun. Mode <em>Combine &gt; All Possible Combinations</em> : produit cartésien. Essentiel pour les workflows en parallèle.' },
      { name: 'Exécution parallèle', from: 'n8n concept', detail: 'Quand plusieurs nodes sont connectés à la sortie d\'un même node, n8n les exécute <strong>en parallèle</strong>. Le Merge node attend que toutes les branches soient terminées avant de s\'exécuter. C\'est un pattern naturel pour agréger des données de sources multiples.' }
    ],
    shared: [
      { concept: 'Code node', targets: ['08'] }
    ]
  },

  /* ----------------------------------------------------------
     05 — Le Routeur Intelligent
     ---------------------------------------------------------- */
  {
    id: '05',
    section: 'branches',
    title: 'Le Routeur Intelligent',
    layer: 'integration',
    done: true,
    jourJ: false,
    concepts: 'Switch node, multi-branch routing, multiple services, error handling basics, ticket routing',
    prereqs: ['02', '03'],
    insights: [
      '<strong>Le Switch node est un <code>switch/case</code> visuel.</strong> — Là où le IF node donne deux branches (true/false), le Switch node peut en créer autant que nécessaire. C\'est l\'outil parfait pour le routage multi-destination : un seul point d\'entrée, N chemins possibles selon le contenu des données.',
      '<strong>Un bon workflow de routage est un workflow documenté.</strong> — Renommez vos nodes ! <code>Route → Bug</code>, <code>Route → Feature</code>, <code>Route → Urgent</code> sont infiniment plus lisibles que <code>Switch1</code>, <code>GitHub1</code>, <code>Notion1</code>. Vos collègues (et votre vous du futur) vous remercieront.',
      '<strong>Penser "fallback" dès le début.</strong> — Que se passe-t-il si le type de ticket ne matche aucune règle ? Le Switch node a une sortie <em>default</em> (fallback). Ne la laissez jamais déconnectée — au minimum, loggez l\'événement non géré.'
    ],
    steps: [
      {
        instruction: 'Créez un workflow <code>05 - Routeur Tickets</code>. Ajoutez un node <strong>Webhook</strong> (POST). Ce webhook recevra des tickets de support avec les champs <code>type</code> (bug, feature, urgent), <code>title</code>, <code>description</code>, et <code>reporter</code>.',
        expected: 'Le node Webhook est prêt à recevoir des tickets structurés en JSON.'
      },
      {
        instruction: 'Ajoutez un node <strong>Switch</strong> connecté au Webhook. Configurez le routing sur le champ <code>{{ $json.type }}</code>. Créez trois règles : <code>bug</code> → sortie 0, <code>feature</code> → sortie 1, <code>urgent</code> → sortie 2. Activez aussi la sortie <em>Fallback</em> pour les types non reconnus.',
        expected: 'Le Switch node affiche 4 sorties : 3 nommées (bug, feature, urgent) + 1 fallback. Renommez-les pour plus de clarté.'
      },
      {
        instruction: 'Sur la sortie <strong>bug</strong>, ajoutez un node <strong>GitHub</strong> (action : <em>Create Issue</em>). Configurez-le pour créer une issue avec le titre <code>🐛 {{ $json.title }}</code> et le body <code>Reporté par : {{ $json.reporter }}\\n\\n{{ $json.description }}</code>. Sélectionnez un repository de test.',
        expected: 'La branche "bug" crée automatiquement une issue GitHub avec le bon formatage.',
        copyable: 'curl -X POST <VOTRE_TEST_URL> \\\n  -H "Content-Type: application/json" \\\n  -d \'{"type": "bug", "title": "Bouton cassé sur la page panier", "description": "Le bouton Valider ne répond pas au clic sur mobile Safari.", "reporter": "marie.dupont"}\''
      },
      {
        instruction: 'Sur la sortie <strong>feature</strong>, ajoutez un node <strong>Notion</strong> (Create Database Page). Créez une page dans une base "Feature Requests" avec les propriétés : <code>Name</code> → titre, <code>Description</code> → description, <code>Reporter</code> → reporter, <code>Status</code> → "New".',
        expected: 'La branche "feature" ajoute une entrée dans la base Notion de feature requests.',
        copyable: 'curl -X POST <VOTRE_TEST_URL> \\\n  -H "Content-Type: application/json" \\\n  -d \'{"type": "feature", "title": "Dark mode pour le dashboard", "description": "Permettre aux utilisateurs de basculer en mode sombre.", "reporter": "jean.martin"}\''
      },
      {
        instruction: 'Sur la sortie <strong>urgent</strong>, ajoutez un node <strong>Slack</strong> (Send Message). Configurez un message d\'alerte avec mention : <code>🚨 *TICKET URGENT* 🚨\\n*{{ $json.title }}*\\nReporté par : {{ $json.reporter }}\\n{{ $json.description }}\\n\\n<!channel> Merci de prendre en charge rapidement.</code>',
        expected: 'La branche "urgent" envoie une alerte Slack avec @channel pour notifier toute l\'équipe.',
        copyable: 'curl -X POST <VOTRE_TEST_URL> \\\n  -H "Content-Type: application/json" \\\n  -d \'{"type": "urgent", "title": "API de paiement down", "description": "Les paiements échouent depuis 10 minutes. Stripe renvoie des 500.", "reporter": "ops-bot"}\''
      },
      {
        instruction: 'Sur la sortie <strong>fallback</strong>, ajoutez un node <strong>Slack</strong> qui envoie un message de warning : <code>⚠️ Ticket non routé (type inconnu : {{ $json.type }}). Titre : {{ $json.title }}</code>. Cela garantit qu\'aucun ticket n\'est silencieusement perdu.',
        expected: 'Tout ticket avec un type non reconnu génère un avertissement dans Slack plutôt que d\'être ignoré.'
      },
      {
        instruction: 'Testez les 4 scénarios avec les commandes curl fournies dans les étapes précédentes, plus un test fallback avec <code>"type": "question"</code>. Vérifiez que chaque ticket arrive dans le bon système.',
        expected: 'Les bugs créent des issues GitHub, les features créent des pages Notion, les urgents alertent Slack, et les types inconnus génèrent un warning.'
      },
      {
        instruction: 'Ajoutez un node <strong>Respond to Webhook</strong> à la fin de chaque branche pour confirmer le routage : <code>{{ JSON.stringify({ routed: true, destination: "github|notion|slack|fallback", type: $json.type }) }}</code>.',
        expected: 'Chaque appel au webhook reçoit une réponse JSON confirmant où le ticket a été routé. Le workflow est complet et robuste.'
      }
    ],
    apis: [
      { name: 'Switch node', from: 'n8n built-in', detail: 'Route les données vers différentes branches selon la valeur d\'un champ. Équivalent d\'un <code>switch/case</code>. Supporte les comparaisons de strings, nombres, regex, et les expressions. Chaque règle crée une sortie. La sortie <strong>Fallback</strong> capture tout ce qui ne matche aucune règle.' },
      { name: 'GitHub node (Create Issue)', from: 'n8n integration', detail: 'Crée une issue dans un repository GitHub. Supporte le titre, le body (Markdown), les labels, les assignees, et le milestone. Le credential GitHub doit avoir les permissions <code>repo</code> sur le repository cible.' },
      { name: 'Multi-service routing', from: 'n8n pattern', detail: 'Pattern d\'architecture où un workflow reçoit un événement unique et le distribue vers plusieurs services selon son contenu. Le <strong>Switch node</strong> est le routeur central. Chaque branche est indépendante et peut avoir sa propre logique de transformation.' },
      { name: 'Respond to Webhook', from: 'n8n built-in', detail: 'Renvoie une réponse HTTP personnalisée à l\'appelant du webhook. Peut être placé n\'importe où dans le workflow (pas nécessairement à la fin). Contrôle le status code, les headers, et le body. Un seul Respond to Webhook par chemin d\'exécution.' }
    ],
    shared: []
  },

  /* ----------------------------------------------------------
     06 — Bot Slack avec AI Agent
     ---------------------------------------------------------- */
  {
    id: '06',
    section: 'trunk',
    title: 'Bot Slack avec AI Agent',
    layer: 'ai',
    done: true,
    jourJ: false,
    concepts: 'AI Agent node, LLM configuration, Claude, tools, Simple Memory, Slack bot, conversational agent',
    prereqs: ['01'],
    insights: [
      '<strong>Le node AI Agent = un agent complet en une brique.</strong> — LLM + outils + mémoire, c\'est l\'équivalent visuel de <code>createReactAgent()</code> en LangGraph. Pas besoin de coder un <code>AgentExecutor</code> — n8n orchestre la boucle réflexion → action → observation pour vous. C\'est du no-code, mais c\'est un <em>vrai</em> agent.',
      '<strong>Les "tools" sont des nodes connectés au AI Agent.</strong> — Chaque node-outil devient une capacité que l\'IA peut invoquer — exactement comme <code>bindTools()</code> en LangChain. Un <code>Calculator</code> connecté = l\'agent sait calculer. Un <code>HTTP Request</code> connecté = l\'agent peut appeler des API. Le LLM <em>décide lui-même</em> quand utiliser chaque outil.',
      '<strong>La mémoire transforme un bot en assistant.</strong> — Sans <code>Simple Memory</code>, chaque message est traité indépendamment. Avec, l\'agent se souvient des échanges précédents. "Quel est le cours du Bitcoin ?" puis "Et en euros ?" fonctionne car l\'agent a le contexte.'
    ],
    steps: [
      {
        instruction: 'Créez un workflow <code>06 - Bot Slack AI</code>. Ajoutez un node <strong>Slack Trigger</strong> (événement : <em>New Message Posted to Channel</em>). Sélectionnez le credential Slack et choisissez un channel de test.',
        expected: 'Le node Slack Trigger est configuré et écoute les nouveaux messages dans le channel sélectionné.'
      },
      {
        instruction: 'Ajoutez un node <strong>AI Agent</strong>. Connectez le Slack Trigger à l\'entrée principale du AI Agent. Dans le champ <em>Text</em> (prompt utilisateur), mettez <code>{{ $json.text }}</code> pour passer le message Slack comme input.',
        expected: 'Le node AI Agent est connecté au Slack Trigger. Le message Slack sera transmis au LLM comme requête utilisateur.'
      },
      {
        instruction: 'Configurez le <strong>LLM</strong> : cliquez sur l\'entrée <em>Chat Model</em> du AI Agent, ajoutez un node <strong>Anthropic Chat Model</strong>. Sélectionnez le credential Anthropic disponible sur l\'instance et choisissez le modèle <code>claude-sonnet-4-20250514</code> (ou sélectionnez le dernier modèle Claude Sonnet disponible dans la liste).',
        expected: 'Le node Anthropic Chat Model est connecté à l\'entrée Model du AI Agent. Claude est prêt à répondre.'
      },
      {
        instruction: 'Ajoutez un <strong>System Message</strong> dans les options du AI Agent : <code>Tu es un assistant IA pour l\'équipe Evaneos pendant le hackathon Community Days. Tu es concis, utile, et tu réponds en français. Si tu ne sais pas, dis-le honnêtement.</code>',
        expected: 'Le system prompt est configuré. Il cadre le comportement de l\'agent : langue, ton, honnêteté.'
      },
      {
        instruction: 'Ajoutez des <strong>tools</strong> : connectez un node <strong>Calculator</strong> et un node <strong>HTTP Request Tool</strong> aux entrées <em>Tools</em> du AI Agent. Pour le HTTP Request Tool, donnez-lui le nom <code>fetch_data</code> et la description <code>Appelle une URL pour récupérer des données. Utilise cet outil quand l\'utilisateur demande des informations en temps réel.</code>',
        expected: 'Deux nodes-outils sont connectés à l\'AI Agent. L\'agent peut maintenant calculer et faire des requêtes HTTP.'
      },
      {
        instruction: 'Ajoutez de la <strong>mémoire</strong> : connectez un node <strong>Simple Memory</strong> à l\'entrée <em>Memory</em> du AI Agent. Configurez la fenêtre à <code>10</code> messages. Utilisez <code>{{ $json.channel + "_" + $json.user }}</code> comme <em>Session ID</em> pour isoler les conversations par utilisateur et channel.',
        expected: 'La mémoire est configurée avec un session ID unique par utilisateur/channel. L\'agent maintiendra le contexte conversationnel.'
      },
      {
        instruction: 'Ajoutez un node <strong>Slack</strong> (Send Message) en sortie du AI Agent. Configurez-le pour répondre dans le même channel : <code>{{ $json.channel }}</code> (ou utilisez le channel ID du trigger). Le texte du message est <code>{{ $json.output }}</code> (la réponse de l\'agent).',
        expected: 'Le bot répond dans le channel Slack. Le workflow complet : Slack Trigger → AI Agent (avec LLM + tools + mémoire) → Slack response.'
      },
      {
        instruction: 'Activez le workflow et testez dans Slack : envoyez <code>Combien font 42 * 17 ?</code>, puis <code>Divise le résultat par 3</code>. Observez dans l\'historique d\'exécution quels outils l\'agent utilise et comment la mémoire maintient le contexte.',
        expected: 'L\'agent utilise le Calculator pour le calcul, puis se souvient du résultat pour la question suivante. Le panneau d\'exécution montre la chaîne : message → réflexion LLM → appel outil → réponse.'
      }
    ],
    apis: [
      { name: 'AI Agent node', from: 'n8n AI', detail: 'Node central de l\'IA dans n8n. Orchestre un LLM avec des outils et une mémoire. Équivalent visuel de <code>createReactAgent()</code> en LangGraph. Gère automatiquement la boucle <strong>réflexion → action → observation</strong>. Supporte les system prompts, les output parsers, et les tools.' },
      { name: 'Anthropic Chat Model', from: 'n8n AI', detail: 'Connecte Claude comme LLM. Supporte les modèles Claude 3.5 Haiku, Claude 4 Sonnet, et Claude 4 Opus. Configuré via un credential avec la clé API Anthropic. Paramètres ajustables : <code>temperature</code>, <code>maxTokens</code>, <code>topP</code>.' },
      { name: 'Tools (Calculator, HTTP Request)', from: 'n8n AI', detail: 'Les nodes connectés à l\'entrée <em>Tools</em> du AI Agent deviennent des capacités invocables par le LLM. Le LLM décide <strong>quand et comment</strong> les utiliser en fonction de la requête. Chaque tool a un <code>name</code> et une <code>description</code> qui guident le LLM.' },
      { name: 'Simple Memory', from: 'n8n AI', detail: 'Mémoire conversationnelle à fenêtre glissante. Stocke les N derniers messages (humain + IA). Le <strong>Session ID</strong> permet d\'isoler les conversations. Équivalent de <code>BufferWindowMemory</code> en LangChain. Sans mémoire, chaque message est traité comme une conversation nouvelle.' },
      { name: 'Slack Trigger', from: 'n8n integration', detail: 'Déclenche le workflow sur des événements Slack : nouveau message, réaction ajoutée, mention, etc. Utilise l\'API Events de Slack via OAuth. Les données incluent <code>text</code>, <code>user</code>, <code>channel</code>, <code>ts</code> (timestamp), et <code>thread_ts</code> (pour les threads).' }
    ],
    shared: [
      { concept: 'AI Agent', targets: ['07'] }
    ]
  },

  /* ----------------------------------------------------------
     07 — RAG Simplifié : Q&A sur vos Docs
     ---------------------------------------------------------- */
  {
    id: '07',
    section: 'branches',
    title: 'RAG Simplifié : Q&A sur vos Docs',
    layer: 'ai',
    done: true,
    jourJ: false,
    concepts: 'RAG, AI Agent avec Notion tool, retrieval, system prompt grounding, citation, knowledge base',
    prereqs: ['02', '06'],
    insights: [
      '<strong>RAG = donner des yeux à votre LLM.</strong> — Un LLM sans contexte invente (hallucine). Un LLM avec RAG <em>cherche d\'abord, répond ensuite</em>. En connectant Notion comme tool, vous transformez votre base documentaire en source de vérité consultable par l\'IA. C\'est la différence entre un ChatGPT générique et un assistant qui connaît <em>votre</em> entreprise.',
      '<strong>Le system prompt est votre garde-fou.</strong> — Sans instruction explicite, le LLM répondra même quand il ne trouve rien dans Notion. Avec un system prompt bien rédigé (<em>"Réponds uniquement à partir des documents trouvés. Si aucun document ne répond à la question, dis-le."</em>), vous réduisez drastiquement les hallucinations.',
      '<strong>La qualité du RAG dépend de la qualité de vos docs.</strong> — Garbage in, garbage out. Si vos pages Notion sont mal structurées, sans titres clairs, avec du contenu mélangé, le retrieval sera médiocre. Investir dans la structuration de vos docs, c\'est investir dans la qualité de votre IA.'
    ],
    steps: [
      {
        instruction: 'Préparez votre base de connaissances : créez (ou utilisez) une base Notion avec 3-5 pages documentées. Par exemple : "Processus de déploiement", "Guide onboarding", "FAQ technique". Chaque page doit avoir un titre clair et du contenu structuré.',
        expected: 'Une base Notion existe avec plusieurs pages de contenu. Chaque page a un titre descriptif et du contenu substantiel.'
      },
      {
        instruction: 'Créez un workflow <code>07 - RAG Q&A</code>. Ajoutez un node <strong>Slack Trigger</strong> qui écoute les messages dans un channel dédié (ex : <code>#ask-docs</code>). Ce channel sera le point d\'entrée pour les questions.',
        expected: 'Le Slack Trigger est configuré et écoute le channel dédié aux questions.'
      },
      {
        instruction: 'Ajoutez un node <strong>AI Agent</strong> connecté au Slack Trigger. Configurez le champ <em>Text</em> avec <code>{{ $json.text }}</code>. Ajoutez un <strong>Anthropic Chat Model</strong> (<code>claude-sonnet-4-20250514</code> ou le dernier modèle Claude Sonnet disponible) comme LLM.',
        expected: 'L\'AI Agent est connecté avec Claude comme modèle. Il est prêt à recevoir des questions depuis Slack.'
      },
      {
        instruction: 'Configurez le <strong>System Message</strong> avec le prompt ci-dessous. Ce prompt force l\'agent à s\'appuyer sur les documents et à citer ses sources.',
        expected: 'Le system prompt est configuré. Il cadre le comportement RAG : chercher d\'abord, citer toujours, avouer les lacunes.',
        copyable: 'Tu es un assistant documentaire pour l\'équipe Evaneos. Ton rôle :\n\n1. CHERCHE toujours dans la base Notion AVANT de répondre.\n2. BASE ta réponse UNIQUEMENT sur les documents trouvés.\n3. CITE la source (titre de la page Notion) pour chaque information.\n4. Si aucun document ne répond à la question, dis : "Je n\'ai pas trouvé d\'information à ce sujet dans la documentation."\n5. Réponds en français, de manière concise et structurée.\n\nNe JAMAIS inventer d\'information qui ne vient pas des documents.'
      },
      {
        instruction: 'Ajoutez un <strong>Notion tool</strong> connecté à l\'entrée <em>Tools</em> du AI Agent. Configurez-le avec le credential Notion de l\'instance. Nommez-le <code>search_documentation</code> et décrivez-le : <code>Recherche dans la base de documentation Notion de l\'équipe. Utilise cet outil pour trouver des informations sur les processus, guides, et FAQ internes.</code>',
        expected: 'Le tool Notion est connecté au AI Agent. L\'agent peut maintenant chercher dans la base Notion quand on lui pose une question.'
      },
      {
        instruction: 'Ajoutez une <strong>Simple Memory</strong> (fenêtre de 5 messages, Session ID : <code>{{ $json.channel + "_" + $json.user }}</code>) pour permettre les questions de suivi.',
        expected: 'La mémoire est configurée. L\'utilisateur peut poser une question, puis demander des précisions sans répéter le contexte.'
      },
      {
        instruction: 'Ajoutez un node <strong>Slack</strong> (Send Message) en sortie. Configurez-le pour répondre dans un <em>thread</em> : utilisez <code>{{ $json.ts }}</code> comme <em>Thread TS</em> pour répondre dans le fil du message original plutôt qu\'en message séparé.',
        expected: 'Les réponses apparaissent en thread sous la question. Le channel reste propre et organisé.'
      },
      {
        instruction: 'Activez le workflow et testez : posez une question dans le channel Slack, par exemple <code>Comment fait-on un déploiement ?</code>. Vérifiez que l\'agent consulte Notion, cite sa source, et répond dans un thread.',
        expected: 'L\'agent cherche dans Notion, trouve la page pertinente, et répond avec une citation. Si la question est hors-sujet, il le dit honnêtement.'
      }
    ],
    apis: [
      { name: 'Notion tool (AI Agent)', from: 'n8n AI', detail: 'Un node Notion configuré comme <em>tool</em> du AI Agent. L\'agent peut l\'invoquer pour <strong>chercher</strong> dans une base Notion, <strong>lire</strong> le contenu d\'une page, ou <strong>lister</strong> les entrées d\'une base. Le <code>name</code> et la <code>description</code> du tool guident le LLM sur quand l\'utiliser.' },
      { name: 'RAG pattern', from: 'AI concept', detail: '<strong>Retrieval-Augmented Generation</strong> : le LLM cherche d\'abord des documents pertinents, puis génère sa réponse en s\'appuyant sur le contenu trouvé. Réduit les hallucinations en ancrant la réponse dans des données réelles. Dans n8n, c\'est implémenté via un AI Agent + un tool de recherche (Notion, Pinecone, Qdrant...).' },
      { name: 'System prompt grounding', from: 'AI concept', detail: 'Technique consistant à contraindre le comportement du LLM via le <strong>system message</strong>. En lui demandant explicitement de citer ses sources et d\'avouer ses lacunes, on réduit les hallucinations. Le system prompt est l\'équivalent des "instructions de travail" pour l\'agent.' },
      { name: 'Thread replies (Slack)', from: 'Slack concept', detail: 'En passant le <code>ts</code> (timestamp) du message original comme <em>Thread TS</em>, le node Slack répond dans un fil de discussion plutôt qu\'en message séparé. Garde le channel propre et regroupe les Q&A. Le <code>ts</code> est fourni par le Slack Trigger.' }
    ],
    shared: []
  },

  /* ----------------------------------------------------------
     08 — Orchestration Avancée : Fan-out & Error Handling
     ---------------------------------------------------------- */
  {
    id: '08',
    section: 'branches',
    title: 'Orchestration Avancée : Fan-out & Error Handling',
    layer: 'integration',
    done: true,
    jourJ: false,
    concepts: 'SplitInBatches, parallel execution, Merge, Error Trigger, error handling, health check, monitoring',
    prereqs: ['04'],
    insights: [
      '<strong>Le SplitInBatches est votre outil de "fan-out".</strong> — Il prend une liste d\'items et les traite un par un (ou par lot). Combiné avec un HTTP Request, il permet de vérifier N endpoints en séquence contrôlée. C\'est le <code>for...of</code> du no-code — avec en bonus la gestion native des erreurs par item.',
      '<strong>L\'Error Trigger est votre filet de sécurité.</strong> — Un pipeline silencieusement cassé est <em>pire</em> qu\'un pipeline qui n\'existe pas. L\'Error Trigger vit dans un workflow séparé et se déclenche automatiquement quand un workflow échoue. Configurez-le une fois, dormez tranquille pour toujours.',
      '<strong>"Continue on error" : le mode résilient.</strong> — Par défaut, une erreur dans un node arrête tout le workflow. En activant <em>Continue on error</em> sur un node, le workflow continue avec les données d\'erreur. Parfait pour le health-check : vous <em>voulez</em> savoir quels endpoints échouent, pas arrêter la vérification au premier problème.'
    ],
    steps: [
      {
        instruction: 'Créez un workflow <code>08 - Health Check Monitor</code>. Ajoutez un node <strong>Schedule Trigger</strong> configuré pour s\'exécuter toutes les 15 minutes : expression cron <code>*/15 * * * *</code>.',
        expected: 'Le Schedule Trigger est configuré pour s\'exécuter 4 fois par heure.',
        copyable: '*/15 * * * *'
      },
      {
        instruction: 'Ajoutez un node <strong>Code</strong> (JavaScript) connecté au Schedule Trigger. Ce node définit la liste des endpoints à vérifier. Collez le code ci-dessous.',
        expected: 'Le Code node retourne une liste d\'items, chacun représentant un endpoint à vérifier avec son nom et son URL.',
        copyable: "return [\n  { json: { name: 'JSONPlaceholder API', url: 'https://jsonplaceholder.typicode.com/posts/1', expectedStatus: 200 } },\n  { json: { name: 'httpstat.us 200', url: 'https://httpstat.us/200', expectedStatus: 200 } },\n  { json: { name: 'httpstat.us 500 (test fail)', url: 'https://httpstat.us/500', expectedStatus: 200 } },\n  { json: { name: 'GitHub API', url: 'https://api.github.com', expectedStatus: 200 } },\n  { json: { name: 'Endpoint inexistant', url: 'https://thisdomaindoesnotexist12345.com', expectedStatus: 200 } }\n];"
      },
      {
        instruction: 'Ajoutez un node <strong>SplitInBatches</strong> connecté au Code node. Configurez la taille du batch à <code>1</code> pour traiter les endpoints un par un. Cela crée une boucle.',
        expected: 'Le SplitInBatches est connecté. Il traitera chaque endpoint séquentiellement, un à la fois.'
      },
      {
        instruction: 'Ajoutez un node <strong>HTTP Request</strong> connecté à la sortie du SplitInBatches. Configurez l\'URL avec <code>{{ $json.url }}</code>. <strong>Important :</strong> dans les settings du node (onglet Settings), activez <em>Continue on Error</em> pour que le workflow ne s\'arrête pas si un endpoint est down.',
        expected: 'Le HTTP Request utilise l\'URL dynamique de chaque item. Le mode "Continue on Error" est activé — les erreurs seront capturées, pas fatales.'
      },
      {
        instruction: 'Ajoutez un node <strong>Code</strong> connecté au HTTP Request. Ce node évalue le résultat et prépare un rapport par endpoint. Collez le code ci-dessous. Reconnectez la sortie de ce Code node à l\'entrée du SplitInBatches pour <strong>fermer la boucle</strong>.',
        expected: 'Le Code node analyse chaque réponse et produit un status (OK/FAIL). La boucle est fermée : SplitInBatches → HTTP Request → Code → retour au SplitInBatches.',
        copyable: "const item = $input.first();\nconst name = item.json.name || 'Unknown';\nconst url = item.json.url || '';\nconst expectedStatus = item.json.expectedStatus || 200;\n\nlet status = 'OK';\nlet detail = '';\n\nif (item.json.error) {\n  status = 'FAIL';\n  detail = item.json.error.message || 'Erreur inconnue';\n} else {\n  const httpStatus = item.json.statusCode || item.json.$response?.statusCode;\n  if (httpStatus && httpStatus !== expectedStatus) {\n    status = 'FAIL';\n    detail = `Status HTTP ${httpStatus} (attendu: ${expectedStatus})`;\n  } else {\n    detail = `Status HTTP ${httpStatus || 'OK'}`;\n  }\n}\n\nreturn [{ json: { name, url, status, detail, checkedAt: new Date().toISOString() } }];"
      },
      {
        instruction: 'Sur la <strong>seconde sortie</strong> du SplitInBatches (la sortie "done" — quand tous les items sont traités), ajoutez un node <strong>Code</strong> qui agrège les résultats et décide s\'il faut alerter. Collez le code ci-dessous.',
        expected: 'Ce Code node reçoit tous les résultats et produit un rapport agrégé avec la liste des échecs.',
        copyable: "const results = $input.all();\nconst failures = results.filter(r => r.json.status === 'FAIL');\nconst total = results.length;\n\nconst report = {\n  timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),\n  total,\n  healthy: total - failures.length,\n  failed: failures.length,\n  failures: failures.map(f => ({\n    name: f.json.name,\n    detail: f.json.detail\n  })),\n  shouldAlert: failures.length > 0\n};\n\nreturn [{ json: report }];"
      },
      {
        instruction: 'Ajoutez un node <strong>IF</strong> connecté au Code d\'agrégation. Condition : <code>{{ $json.shouldAlert }}</code> est <code>true</code>. Sur la branche <strong>true</strong>, ajoutez un node <strong>Slack</strong> avec le message d\'alerte ci-dessous.',
        expected: 'L\'alerte Slack n\'est envoyée QUE si au moins un endpoint est en échec. Pas de bruit quand tout va bien.',
        copyable: '🚨 *Health Check Alert — {{ $json.timestamp }}*\n\n{{ $json.failed }}/{{ $json.total }} endpoints en échec :\n\n{{ $json.failures.map(f => "❌ *" + f.name + "* : " + f.detail).join("\\n") }}\n\n{{ $json.healthy }}/{{ $json.total }} endpoints OK'
      },
      {
        instruction: 'Créez un <strong>second workflow</strong> : <code>08 - Error Handler Global</code>. Ajoutez un node <strong>Error Trigger</strong> comme déclencheur, puis un node <strong>Slack</strong> : <code>🚨 *Workflow Error*\\nWorkflow : {{ $json.workflow.name }}\\nErreur : {{ $json.execution.error.message }}\\n<{{ $json.execution.url }}|Voir l\'exécution></code>. Activez ce workflow, puis dans les Settings du workflow principal, assignez-le comme <em>Error Workflow</em>.',
        expected: 'Deux couches de sécurité : (1) les alertes applicatives du health-check, (2) les alertes techniques si le workflow lui-même plante. Le monitoring est complet.'
      }
    ],
    apis: [
      { name: 'SplitInBatches node', from: 'n8n built-in', detail: 'Découpe une liste d\'items en lots de taille configurable et les traite itérativement. Deux sorties : la première pour traiter le lot courant, la seconde quand tous les lots sont traités. En reconnectant la sortie du traitement à l\'entrée, on crée une <strong>boucle</strong>. Batch size = 1 pour du traitement séquentiel.' },
      { name: 'Continue on Error', from: 'n8n concept', detail: 'Option disponible dans les <em>Settings</em> de chaque node. Quand activée, une erreur dans ce node ne stoppe pas le workflow — les données d\'erreur sont transmises au node suivant avec un champ <code>$json.error</code>. Essentiel pour les workflows de monitoring qui doivent continuer même si un endpoint est down.' },
      { name: 'Error Trigger workflow', from: 'n8n built-in', detail: 'Workflow spécial déclenché automatiquement quand un autre workflow échoue. Reçoit les détails de l\'erreur via <code>$json.execution.error</code> et les infos du workflow via <code>$json.workflow</code>. Doit vivre dans un <strong>workflow séparé</strong> et être activé.' },
      { name: 'Pattern boucle (loop)', from: 'n8n pattern', detail: 'n8n n\'a pas de node "loop" natif. On crée une boucle en reconnectant la sortie d\'un node à l\'entrée du <code>SplitInBatches</code>. À chaque itération, le SplitInBatches fournit le lot suivant. Quand tous les items sont traités, il émet sur la sortie "done".' },
      { name: 'Health check pattern', from: 'Architecture pattern', detail: 'Pattern de monitoring : vérifier périodiquement la disponibilité de services et alerter en cas de problème. Composants clés : <strong>Schedule Trigger</strong> (périodicité), <strong>SplitInBatches</strong> (itération), <strong>HTTP Request</strong> (vérification), <strong>IF</strong> (décision d\'alerte), <strong>Slack</strong> (notification).' }
    ],
    shared: [
      { concept: 'Error handling', targets: [] }
    ]
  }
];

/* ============================================================
   Mutations (hot-patches applied at runtime)
   ============================================================ */
const MUTATIONS = [];

/* ============================================================
   Layer Metadata
   ============================================================ */
const LAYER_META = {
  basics: {
    label: 'Basics',
    className: 'layer--basics',
    glowColor: 'var(--basics-glow)',
    lineColor: 'var(--basics-line)',
    tagline: 'Nodes, triggers & premier workflow',
    buildsOn: 'Démarrage<br>Les fondamentaux de l\'automatisation visuelle',
    tooltip: '<strong>Basics</strong> couvre les briques fondamentales de n8n — nodes, triggers, connexions, et expressions. Vous construirez votre premier webhook et apprendrez à transformer et router des données vers Slack et Notion.'
  },
  integration: {
    label: 'Integration',
    className: 'layer--integration',
    glowColor: 'var(--integration-glow)',
    lineColor: 'var(--integration-line)',
    tagline: 'APIs, services & orchestration multi-outils',
    buildsOn: 'S\'appuie sur Basics<br>Ajoute HTTP Request, routing, scheduling, error handling',
    tooltip: '<strong>Integration</strong> connecte n8n au monde extérieur — GitHub, APIs REST, bases de données, pipelines de données. Vous apprendrez le routage conditionnel, l\'exécution planifiée, le fan-out, et la gestion d\'erreurs pour des workflows robustes et production-ready.'
  },
  ai: {
    label: 'AI Agents',
    className: 'layer--ai',
    glowColor: 'var(--ai-glow)',
    lineColor: 'var(--ai-line)',
    tagline: 'LLM, agents conversationnels & RAG',
    buildsOn: 'S\'appuie sur Basics + Integration<br>Ajoute AI Agent, tools, mémoire, retrieval',
    tooltip: '<strong>AI Agents</strong> intègre les LLMs dans n8n. Le node AI Agent est un agent conversationnel complet — LLM + tools + mémoire — dans une seule brique visuelle. Vous construirez un bot Slack intelligent avec Claude et un système RAG qui consulte votre documentation Notion.'
  }
};
