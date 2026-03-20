// ════════════════════════════════════════════════════════════
// DATA — Exercise nodes and layer metadata for the learning map
// Notion Custom Agents — learning path
// Community Days / PIT STOP — Evaneos Hackathon
// ════════════════════════════════════════════════════════════

const EXERCISES = [
  // ──────────────────────────────────────────────────────────
  // 01 — Mon Premier Agent : Daily Digest
  // ──────────────────────────────────────────────────────────
  {
    id: '01', section: 'trunk', title: 'Mon Premier Agent : Daily Digest', layer: 'basics', done: true, jourJ: true,
    concepts: 'Custom Agent, scheduled trigger, instructions, data sources, Chat tab, Activity tab',
    prereqs: [],
    insights: [
      '<strong>Un Custom Agent n\'est PAS un chatbot.</strong> C\'est un assistant autonome qui tourne en arrière-plan, comme un cron job intelligent. Vous le configurez une fois, il travaille sans vous — à 9h chaque matin, il a déjà lu votre base et préparé votre résumé.',
      '<strong>Les instructions sont du prompt engineering pur.</strong> La différence entre un résumé inutile et un briefing actionnable tient en une phrase : <code>"Résume en 3 bullet points max, en français, avec le statut et le responsable"</code>. Plus vous êtes précis, meilleur est le résultat.',
      '<strong>L\'onglet Chat est votre terrain de jeu.</strong> Vous n\'avez pas besoin d\'attendre 9h demain pour voir si votre agent fonctionne. Le Chat utilise les mêmes instructions et data sources — c\'est votre boucle de feedback instantanée.'
    ],
    steps: [
      {
        instruction: 'Dans Notion, ouvrez le menu latéral et cliquez sur <strong>Agents</strong>, puis sur le bouton <strong>+</strong> pour créer un nouvel agent.<br><em>Note : Les Custom Agents nécessitent un plan Notion <strong>Business</strong> ou <strong>Enterprise</strong>.</em>',
        expected: 'La page de gestion des Agents s\'affiche. Vous voyez la liste des agents existants ou un écran vide si c\'est votre premier.'
      },
      {
        instruction: 'Choisissez <strong>From scratch</strong> (ou utilisez <strong>Create with AI chat</strong> pour décrire votre agent en langage naturel et laisser Notion générer la configuration). Nommez votre agent <code>Daily Digest</code>.',
        expected: 'L\'éditeur d\'agent s\'ouvre avec les champs Name, Instructions, et les sections Triggers et Data sources. Le nom "Daily Digest" apparaît en haut.'
      },
      {
        instruction: 'Dans la section <strong>Data sources / Tools and Access</strong>, cliquez sur <strong>Add data source</strong> et sélectionnez une base de données Notion existante (ex : une base de tâches, de projets, ou de notes).',
        expected: 'La base apparaît dans la liste des sources avec une icône de base de données. L\'agent n\'aura accès qu\'à cette base — pas à tout le workspace.'
      },
      {
        instruction: 'Rédigez les instructions de votre agent. Copiez le texte ci-dessous et collez-le dans le champ <strong>Instructions</strong>.',
        expected: 'Les instructions apparaissent dans le champ dédié. Elles définissent le comportement, le format et la langue de l\'agent.',
        copyable: 'Tu es un assistant de productivité. Chaque jour, tu prépares un résumé des entrées récentes.\n\n## Tâche\nLis toutes les entrées ajoutées ou modifiées dans les dernières 24 heures.\n\n## Format de sortie\nPour chaque entrée :\n- **Titre** — résumé en une phrase + statut actuel\n\nRegroupe par statut (À faire, En cours, Terminé). Si aucune entrée récente, écris "Rien de nouveau dans les dernières 24h — bonne journée !"\n\n## Langue\nÉcris toujours en français.'
      },
      {
        instruction: 'Dans la section <strong>Triggers</strong>, cliquez sur <strong>Add trigger</strong> et choisissez <strong>Daily schedule</strong>. Configurez l\'heure à <strong>9h00</strong>.',
        expected: 'Le trigger planifié apparaît avec la mention "Runs daily at 9:00 AM". L\'agent s\'exécutera automatiquement chaque matin.'
      },
      {
        instruction: 'Testez immédiatement votre agent : allez dans l\'onglet <strong>Chat</strong> et envoyez le message <code>Prépare le résumé du jour</code>.',
        expected: 'L\'agent répond avec un résumé structuré, regroupé par statut. Le format correspond à vos instructions. Si la base est vide, il répond avec le message par défaut.'
      },
      {
        instruction: 'Si le résultat n\'est pas satisfaisant, retournez dans <strong>Settings</strong>, modifiez les instructions, puis re-testez dans <strong>Chat</strong>. Itérez 2-3 fois.',
        expected: 'Chaque itération améliore le résultat. Vous constatez que les instructions plus précises produisent des résumés plus utiles.'
      },
      {
        instruction: 'Allez dans l\'onglet <strong>Activity</strong> pour voir l\'historique de toutes les exécutions (tests Chat inclus).',
        expected: 'Le log d\'activité montre vos tests avec le timestamp, le statut (Success/Failure), et un aperçu de chaque réponse. C\'est votre outil de debugging principal.'
      }
    ],
    apis: [
      { name: 'Custom Agent',
        from: 'Notion',
        detail: 'Un assistant IA autonome intégré à Notion. Contrairement au Notion AI classique (qui répond à la demande), un Custom Agent <strong>tourne en arrière-plan</strong> selon des triggers définis. Il a accès aux données de votre workspace et peut lire, résumer, et modifier des pages. Pensez-y comme un collègue infatigable qui fait le travail répétitif.' },
      { name: 'Instructions',
        from: 'Custom Agent',
        detail: 'Le prompt qui guide le comportement de l\'agent. C\'est du <strong>prompt engineering pur</strong> — structure recommandée : <code>rôle → tâche → format → contraintes → langue</code>. Les instructions sont exécutées à chaque trigger. Bonnes pratiques : spécifier la langue, le format de sortie, les limites, et prévoir un cas par défaut.' },
      { name: 'Scheduled trigger',
        from: 'Custom Agent',
        detail: 'Définit <strong>quand</strong> l\'agent s\'exécute automatiquement. Quatre fréquences : <strong>daily</strong> (chaque jour à heure fixe), <strong>weekly</strong> (un jour précis), <strong>monthly</strong> (une date du mois), <strong>yearly</strong> (une date dans l\'année). C\'est le trigger le plus simple — l\'agent tourne comme un cron job. Idéal pour les digests, rapports, et revues périodiques.' },
      { name: 'Data sources',
        from: 'Custom Agent',
        detail: 'Les bases de données et pages Notion auxquelles l\'agent a accès. L\'agent ne voit <strong>que</strong> les sources explicitement configurées — pas tout le workspace. C\'est le <strong>principe du moindre privilège</strong> : donnez accès uniquement aux bases nécessaires. Vous pouvez aussi ajouter des pages individuelles.' },
      { name: 'Chat tab',
        from: 'Custom Agent',
        detail: 'Interface de test interactive. Permet de dialoguer avec l\'agent <strong>sans attendre un trigger</strong>. L\'agent utilise les mêmes instructions et data sources que lors d\'une exécution automatique. C\'est votre <strong>boucle de feedback rapide</strong> — indispensable pour itérer sur les instructions avant de laisser l\'agent tourner en autonomie.' }
    ],
    shared: [
      { concept: 'Instructions', targets: ['02', '03', '04', '05', '06', '07', '08'] }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 02 — Le Trieur Automatique
  // ──────────────────────────────────────────────────────────
  {
    id: '02', section: 'trunk', title: 'Le Trieur Automatique', layer: 'basics', done: true, jourJ: true,
    concepts: 'Database event trigger, page created, écriture dans Notion, auto-catégorisation, timing des triggers',
    prereqs: ['01'],
    insights: [
      '<strong>Les triggers événementiels transforment votre base Notion en système réactif.</strong> Chaque nouvelle page déclenche automatiquement une chaîne d\'actions — plus besoin de trier manuellement. C\'est la différence entre un tableur et un workflow.',
      '<strong>Attention au timing : l\'agent se déclenche dès que la page est créée, même si elle est vide.</strong> Si l\'utilisateur crée la page puis remplit le contenu progressivement, l\'agent peut analyser une page encore incomplète. Astuce : basez la catégorisation sur le <strong>titre</strong> (rempli dès la création) plutôt que sur le body.',
      '<strong>L\'agent peut écrire dans la page qui l\'a déclenché.</strong> C\'est un pattern puissant : lire le contenu → analyser → mettre à jour les propriétés. Mais attention aux boucles infinies si vous utilisez un trigger "page modified" — l\'agent qui modifie la page peut re-déclencher le trigger.'
    ],
    steps: [
      {
        instruction: 'Préparez votre base de données cible. Assurez-vous qu\'elle a une propriété <strong>Select</strong> nommée <code>Catégorie</code> avec les options : <code>Bug</code>, <code>Feature</code>, <code>Question</code>, <code>Documentation</code>. Ajoutez aussi une propriété Select <code>Priorité</code> avec <code>Haute</code>, <code>Moyenne</code>, <code>Basse</code>.',
        expected: 'La base de données contient les propriétés "Catégorie" et "Priorité" avec les options définies. Ces propriétés seront remplies automatiquement par l\'agent.'
      },
      {
        instruction: 'Créez un nouvel agent (<strong>New agent &rarr; From scratch</strong>). Nommez-le <code>Trieur Automatique</code>.',
        expected: 'L\'éditeur d\'agent s\'ouvre avec un agent vierge nommé "Trieur Automatique".'
      },
      {
        instruction: 'Dans la section <strong>Triggers</strong>, cliquez sur <strong>Add trigger</strong> et choisissez <strong>Database event</strong>. Sélectionnez votre base de données, puis cochez <strong>Page created</strong>.',
        expected: 'Le trigger apparaît avec la mention "When a page is created in [nom de la base]". L\'agent réagira à chaque nouvelle page.'
      },
      {
        instruction: 'Ajoutez la même base de données comme <strong>Data source</strong> dans la section <strong>Data sources / Tools and Access</strong> (nécessaire pour que l\'agent puisse la lire et y écrire).',
        expected: 'La base apparaît dans les Data sources. L\'agent a maintenant le droit de lire et modifier les pages de cette base.'
      },
      {
        instruction: 'Rédigez les instructions de catégorisation automatique. Copiez le texte ci-dessous.',
        expected: 'Les instructions sont enregistrées dans l\'éditeur.',
        copyable: 'Tu es un trieur automatique. Quand une nouvelle page est créée dans la base, tu dois la catégoriser.\n\n## Règles de catégorisation\nAnalyse le titre et le contenu de la page, puis assigne :\n\n### Catégorie (propriété "Catégorie")\n- **Bug** : problème, erreur, crash, "ne fonctionne pas", régression\n- **Feature** : amélioration, nouvelle fonctionnalité, "il faudrait", suggestion\n- **Documentation** : doc, guide, tutoriel, "comment faire"\n- **Question** : tout ce qui ne rentre pas clairement dans les autres catégories\n\n### Priorité (propriété "Priorité")\n- **Haute** : mots-clés urgents (bloquant, critique, production, urgent)\n- **Moyenne** : par défaut\n- **Basse** : nice-to-have, cosmétique, futur\n\n## Règle importante\nSi le contenu est vide ou ambigu, utilise Catégorie = "Question" et Priorité = "Moyenne". Ne laisse JAMAIS ces champs vides.'
      },
      {
        instruction: 'Testez en créant une nouvelle page dans la base avec le titre <code>Le bouton de connexion ne fonctionne plus en production</code>.',
        expected: 'Après quelques secondes, l\'agent s\'exécute : la propriété "Catégorie" passe à "Bug" et la "Priorité" à "Haute" (car "production" est un mot-clé urgent).'
      },
      {
        instruction: 'Créez une deuxième page avec un titre ambigu : <code>Améliorer le dashboard</code> (sans autre contenu).',
        expected: 'L\'agent assigne "Feature" pour la catégorie et "Moyenne" pour la priorité. Vérifiez dans l\'Activity log le raisonnement de l\'agent.'
      },
      {
        instruction: 'Vérifiez l\'onglet <strong>Activity</strong> pour les deux exécutions. Comparez le raisonnement de l\'agent entre un cas clair et un cas ambigu.',
        expected: 'Le log montre deux entrées avec le trigger "Page created". Pour chaque exécution, vous voyez le statut, le timestamp, et le détail des propriétés modifiées.'
      }
    ],
    apis: [
      { name: 'Database event trigger',
        from: 'Custom Agent',
        detail: 'Déclenche l\'agent quand un événement survient dans une base Notion. Quatre types : <strong>Page added to database</strong> (nouvelle entrée), <strong>Page updated in database</strong> (mise à jour d\'une page existante), <strong>Page removed from database</strong> (page retirée), et <strong>Comment added to page</strong> (commentaire ajouté). Les agents peuvent aussi être déclenchés par <strong>@mention</strong> dans les pages ou commentaires. Contrairement au trigger planifié, l\'agent réagit en <strong>quasi temps réel</strong> (délai de quelques secondes à une minute).' },
      { name: 'Page created event',
        from: 'Database event trigger',
        detail: 'Se déclenche quand une nouvelle page est ajoutée à la base. <strong>Attention au timing</strong> : le trigger se lance dès la création, même si le contenu n\'est pas encore rempli. Pour des résultats fiables, basez vos instructions sur les <strong>propriétés</strong> (titre, select) plutôt que sur le contenu body, qui peut encore être en cours de rédaction.' },
      { name: 'Écriture dans Notion',
        from: 'Custom Agent',
        detail: 'L\'agent peut <strong>modifier les propriétés</strong> d\'une page Notion : changer un statut, assigner un tag, remplir un champ. Pour cela, la base doit être configurée comme <strong>Data source</strong> de l\'agent. L\'agent peut modifier la page qui l\'a déclenché — c\'est le pattern "lire → analyser → mettre à jour".' },
      { name: 'Auto-catégorisation',
        from: 'Pattern',
        detail: 'Pattern classique : l\'agent lit le contenu d\'une page et assigne automatiquement des propriétés (tags, catégories, priorités). Fonctionne mieux quand les instructions définissent des <strong>règles claires avec des mots-clés</strong> et un <strong>cas par défaut</strong> pour les situations ambiguës. Combine un trigger événementiel avec des instructions de classification.' }
    ],
    shared: [
      { concept: 'Database triggers', targets: ['04', '06'] }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 03 — Le Pont Slack ↔ Notion
  // ──────────────────────────────────────────────────────────
  {
    id: '03', section: 'trunk', title: 'Le Pont Slack ↔ Notion', layer: 'triggers', done: true, jourJ: false,
    concepts: 'Slack triggers, emoji reaction, cross-tool automation, création de pages depuis Slack',
    prereqs: ['01'],
    insights: [
      '<strong>L\'emoji devient un bouton d\'action.</strong> Réagir avec 🎫 sur un message Slack crée automatiquement un ticket dans Notion. Plus besoin de copier-coller entre les outils — l\'agent fait le pont entre la discussion informelle et la documentation structurée.',
      '<strong>Limitation importante : l\'agent n\'accède qu\'aux channels Slack publics.</strong> Les messages privés et DMs sont hors de portée. Ce n\'est pas un bug, c\'est une décision de sécurité de Notion. Planifiez vos workflows en conséquence.',
      '<strong>Le contexte du thread est précieux.</strong> Si le message déclencheur fait partie d\'un thread Slack, l\'agent peut récupérer le contexte de la conversation entière. Mentionnez-le explicitement dans vos instructions : <code>"Inclus le contexte du thread si disponible"</code>.'
    ],
    steps: [
      {
        instruction: 'Vérifiez que la <strong>connexion Slack</strong> est active dans votre workspace Notion. Allez dans <strong>Settings & members &rarr; Connections</strong> et cherchez Slack. Si absent, demandez à un admin workspace de l\'installer.<br><strong>Important :</strong> Un administrateur du workspace Slack doit activer l\'intégration Notion pour les Custom Agents. De plus, votre compte Slack doit utiliser la <strong>même adresse email</strong> que votre compte Notion.',
        expected: 'Slack apparaît dans la liste des connexions avec le statut "Connected" et le nom du workspace Slack associé.'
      },
      {
        instruction: 'Préparez une base de données Notion <code>Tickets</code> avec les propriétés : <strong>Title</strong> (titre), <strong>Source</strong> (URL), <strong>Rapporté par</strong> (text), <strong>Statut</strong> (Select : Nouveau, En cours, Résolu), <strong>Canal</strong> (text).',
        expected: 'La base "Tickets" existe avec toutes les propriétés nécessaires. Le statut par défaut sera "Nouveau".'
      },
      {
        instruction: 'Créez un nouvel agent nommé <code>Slack-to-Ticket</code>. Ajoutez la base "Tickets" comme <strong>Data source</strong>.',
        expected: 'L\'agent est créé et la base "Tickets" apparaît dans ses sources de données.'
      },
      {
        instruction: 'Dans <strong>Triggers</strong>, ajoutez un trigger <strong>Slack</strong>. Choisissez le type <strong>Emoji reaction</strong> et sélectionnez l\'emoji <code>:ticket:</code> (🎫). Sélectionnez un ou plusieurs channels publics à surveiller.',
        expected: 'Le trigger Slack apparaît avec la mention "When someone reacts with 🎫". Les channels surveillés sont listés.'
      },
      {
        instruction: 'Rédigez les instructions de l\'agent. Copiez le texte ci-dessous.',
        expected: 'Les instructions sont enregistrées.',
        copyable: 'Tu es un agent de création de tickets. Quand quelqu\'un réagit avec l\'emoji 🎫 sur un message Slack :\n\n## Actions\n1. Crée une nouvelle page dans la base "Tickets"\n2. **Titre** = résumé du message Slack en une phrase claire (pas le message brut)\n3. **Source** = lien vers le message Slack original\n4. **Rapporté par** = nom de l\'auteur du message\n5. **Canal** = nom du channel Slack\n6. **Statut** = "Nouveau"\n\n## Contenu de la page\nDans le body de la page, inclus :\n- Le message original (en citation)\n- Le contexte du thread si disponible\n- Un résumé en 2-3 phrases de ce qui est demandé/signalé\n\n## Règles\n- Écris toujours en français\n- Si le message est trop vague pour créer un bon titre, utilise le début du message\n- Ne duplique PAS si un ticket avec le même message source existe déjà'
      },
      {
        instruction: 'Testez le flow complet : allez dans un <strong>channel Slack public</strong> surveillé, postez un message comme <code>Le formulaire d\'inscription plante quand on entre un email avec des accents</code>, puis ajoutez la réaction 🎫.',
        expected: 'Après quelques secondes, une nouvelle page apparaît dans la base "Tickets" avec un titre résumé, la source, l\'auteur, et le contenu du message.'
      },
      {
        instruction: 'Vérifiez la page créée dans Notion : le titre est-il un bon résumé ? Les propriétés sont-elles correctement remplies ? Le contenu inclut-il le message original ?',
        expected: 'La page contient toutes les informations attendues. Le titre est un résumé clair (ex : "Bug formulaire inscription avec emails accentués"), pas le message Slack brut.'
      },
      {
        instruction: 'Vérifiez l\'onglet <strong>Activity</strong> de l\'agent. Identifiez le trigger source (emoji reaction) et les actions effectuées.',
        expected: 'L\'Activity log montre le trigger Slack, le channel source, le statut Success, et le détail de la page créée.'
      }
    ],
    apis: [
      { name: 'Slack trigger (emoji reaction)',
        from: 'Custom Agent',
        detail: 'Déclenche l\'agent quand un emoji spécifique est ajouté à un message dans un channel Slack public. Pattern puissant pour le <strong>triage collaboratif</strong> : l\'équipe utilise des emojis comme raccourcis d\'action (🎫 = ticket, 📌 = documenter, ⚠️ = incident). L\'agent transforme un geste simple en action structurée.' },
      { name: 'Slack trigger (autres types)',
        from: 'Custom Agent',
        detail: 'Les triggers Slack disponibles : <strong>Message posted to channel</strong> (nouveau message dans un channel), <strong>Emoji reaction added to message</strong> (réaction emoji), <strong>Thread started in channel</strong> (nouveau thread), <strong>Agent mentioned in message</strong> (quand l\'agent est mentionné via @). Chaque type a ses cas d\'usage — les emoji reactions sont les plus précis car intentionnels.' },
      { name: 'Création de pages',
        from: 'Custom Agent',
        detail: 'L\'agent peut <strong>créer de nouvelles pages</strong> dans une base Notion configurée comme data source. Il remplit le titre, les propriétés (select, text, URL, etc.), et le contenu body. C\'est le pattern inverse de la lecture : au lieu de résumer des données existantes, l\'agent <strong>structure des informations externes</strong> en pages Notion.' },
      { name: 'Cross-tool automation',
        from: 'Pattern',
        detail: 'Pattern où l\'agent fait le pont entre deux outils (Slack &rarr; Notion). L\'information naît dans la conversation informelle et se transforme en documentation structurée. C\'est le <strong>cœur de la valeur ajoutée</strong> des Custom Agents : éliminer le travail manuel de transfert entre outils, sans perdre le contexte.' }
    ],
    shared: [
      { concept: 'Slack integration', targets: ['06', '07'] }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 04 — L'Agent Meeting Notes
  // ──────────────────────────────────────────────────────────
  {
    id: '04', section: 'trunk', title: 'L\'Agent Meeting Notes', layer: 'triggers', done: true, jourJ: false,
    concepts: 'Page modified trigger, extraction structurée, multi-database operations, action items',
    prereqs: ['02'],
    insights: [
      '<strong>Le trigger "page modified" est le complément naturel de "page created".</strong> Ici, l\'agent ne réagit pas à une nouvelle page mais à une mise à jour — parfait pour les meeting notes qu\'on remplit après la réunion. L\'agent attend que vous ayez fini d\'écrire, puis extrait les actions.',
      '<strong>L\'extraction structurée est un super-pouvoir de l\'IA.</strong> Donnez à l\'agent un texte libre de notes de réunion, et il en extrait des tâches avec propriétaire, deadline, et priorité. La clé : définir un <strong>format de sortie explicite</strong> dans les instructions.',
      '<strong>Un agent peut écrire dans plusieurs bases.</strong> Ici, il lit une page dans la base "Meeting Notes" et crée des tâches dans la base "Tâches". C\'est l\'opération multi-database — assurez-vous que les deux bases sont dans les Data sources.'
    ],
    steps: [
      {
        instruction: 'Préparez deux bases de données : <strong>(1)</strong> <code>Meeting Notes</code> avec les propriétés Title, Date, Participants (text), et un statut "Notes prises" (checkbox). <strong>(2)</strong> <code>Tâches</code> avec Title, Assigné à (text), Deadline (date), Priorité (select), Source meeting (relation vers Meeting Notes).',
        expected: 'Les deux bases existent avec les propriétés décrites. La relation entre les deux bases permet de tracer l\'origine de chaque tâche.'
      },
      {
        instruction: 'Créez un nouvel agent nommé <code>Meeting Actions Extractor</code>. Ajoutez les <strong>deux bases</strong> comme Data sources.',
        expected: 'L\'agent est créé avec "Meeting Notes" et "Tâches" dans ses sources de données.'
      },
      {
        instruction: 'Dans <strong>Triggers</strong>, ajoutez un trigger <strong>Database event &rarr; Page modified</strong> sur la base "Meeting Notes".',
        expected: 'Le trigger apparaît : "When a page is modified in Meeting Notes". L\'agent se déclenchera à chaque mise à jour d\'une page de meeting.'
      },
      {
        instruction: 'Rédigez les instructions d\'extraction. Copiez le texte ci-dessous.',
        expected: 'Les instructions sont enregistrées dans l\'éditeur.',
        copyable: 'Tu es un extracteur d\'actions de réunion. Quand une page de meeting est modifiée :\n\n## Étape 1 — Analyse\nLis le contenu de la page de meeting notes. Identifie tous les éléments actionnables : décisions, tâches assignées, deadlines mentionnées.\n\n## Étape 2 — Extraction\nPour chaque action identifiée, crée une nouvelle page dans la base "Tâches" avec :\n- **Titre** : description claire et actionnable de la tâche (commence par un verbe)\n- **Assigné à** : la personne mentionnée (si aucune, écris "Non assigné")\n- **Deadline** : la date mentionnée (si aucune, laisse vide)\n- **Priorité** : Haute si marqué urgent/bloquant, Moyenne par défaut\n- **Source meeting** : lien vers la page de meeting d\'origine\n\n## Étape 3 — Résumé\nAjoute un commentaire sur la page de meeting avec la liste des tâches créées.\n\n## Règles\n- Ne crée PAS de tâche pour les informations générales ou les discussions sans action\n- Si le contenu ne contient aucune action, ne crée rien et ajoute un commentaire "Aucune action identifiée"\n- Écris en français\n- Ignore les modifications mineures (typos, formatage) — ne re-crée pas les tâches déjà extraites'
      },
      {
        instruction: 'Créez une page de test dans "Meeting Notes" avec des notes de réunion réalistes. Incluez des phrases comme : <code>Marie va refaire les maquettes pour vendredi</code>, <code>Décision : on part sur la solution B</code>, <code>URGENT : Pierre doit corriger le bug auth avant la release</code>.',
        expected: 'La page de meeting est créée avec du contenu réaliste contenant des actions claires et des informations générales mélangées.'
      },
      {
        instruction: 'Modifiez la page (ajoutez un participant ou changez le titre) pour déclencher le trigger "page modified". Attendez quelques secondes.',
        expected: 'L\'agent s\'exécute et crée 2-3 tâches dans la base "Tâches" : une pour Marie (maquettes, deadline vendredi), une pour Pierre (bug auth, priorité Haute). La décision n\'est PAS transformée en tâche.'
      },
      {
        instruction: 'Vérifiez les tâches créées dans la base "Tâches". Chaque tâche a-t-elle un titre actionnable, un assigné, et un lien vers le meeting source ?',
        expected: 'Les tâches sont bien structurées. Les titres commencent par un verbe ("Refaire les maquettes", "Corriger le bug auth"). La relation "Source meeting" pointe vers la page d\'origine.'
      },
      {
        instruction: 'Vérifiez la page de meeting : l\'agent devrait avoir ajouté un commentaire listant les tâches créées. Consultez aussi l\'<strong>Activity log</strong>.',
        expected: 'Un commentaire résume les tâches extraites. L\'Activity log montre le trigger, les pages créées, et le commentaire ajouté.'
      }
    ],
    apis: [
      { name: 'Page modified trigger',
        from: 'Database event trigger',
        detail: 'Se déclenche quand une page existante est modifiée (propriété changée, contenu édité). Idéal pour les workflows de <strong>post-traitement</strong> : l\'utilisateur remplit le contenu, l\'agent le traite ensuite. <strong>Attention aux boucles</strong> : si l\'agent modifie la page (ajout de commentaire), ça peut re-déclencher le trigger. Gérez ce cas dans les instructions.' },
      { name: 'Extraction structurée',
        from: 'Pattern',
        detail: 'Pattern où l\'agent lit du texte libre et en extrait des données structurées (tâches, contacts, décisions). La qualité dépend de la <strong>précision du format de sortie</strong> dans les instructions. Définissez exactement quels champs remplir, avec quelles règles, et quel cas par défaut.' },
      { name: 'Opérations multi-database',
        from: 'Custom Agent',
        detail: 'Un agent peut lire dans une base et écrire dans une autre, à condition que les <strong>deux bases soient dans ses Data sources</strong>. Pattern typique : lire des notes → créer des tâches, lire des tickets → mettre à jour un dashboard. C\'est le début des <strong>workflows automatisés complexes</strong>.' },
      { name: 'Commentaires Notion',
        from: 'Custom Agent',
        detail: 'L\'agent peut <strong>ajouter des commentaires</strong> sur les pages Notion. Utile pour le feedback, les résumés d\'actions, ou les notifications. Les commentaires sont visibles dans l\'historique de la page et notifient les abonnés — un bon moyen de garder les humains dans la boucle.' }
    ],
    shared: []
  },

  // ──────────────────────────────────────────────────────────
  // 05 — Le Veilleur Web
  // ──────────────────────────────────────────────────────────
  {
    id: '05', section: 'trunk', title: 'Le Veilleur Web', layer: 'advanced', done: true, jourJ: false,
    concepts: 'Web browsing, scheduled trigger hebdomadaire, content generation, curation automatique',
    prereqs: ['01'],
    insights: [
      '<strong>Le web browsing donne à votre agent des yeux sur le monde extérieur.</strong> Il ne se limite plus à vos données Notion — il peut chercher des articles, lire des blogs, consulter de la documentation. C\'est la différence entre un agent de reporting interne et un agent de veille stratégique.',
      '<strong>Demandez TOUJOURS les URLs sources.</strong> Le web browsing ajoute un risque d\'hallucination : l\'agent peut "inventer" des résultats quand il ne trouve pas d\'information pertinente. Exigez les liens dans vos instructions avec <code>"Cite TOUJOURS l\'URL source pour chaque information"</code>. Ça force l\'agent à baser ses réponses sur des sources réelles.',
      '<strong>Le trigger hebdomadaire est parfait pour la veille.</strong> Trop fréquent (daily) = bruit. Trop rare (monthly) = retard. Un digest hebdomadaire est le sweet spot pour rester informé sans être submergé.'
    ],
    steps: [
      {
        instruction: 'Créez une base de données <code>Veille Tech</code> avec les propriétés : Title, <strong>Date de publication</strong> (date), <strong>Source</strong> (URL), <strong>Thème</strong> (select : IA, Product, Engineering, Design, Data), <strong>Pertinence</strong> (select : Haute, Moyenne).',
        expected: 'La base "Veille Tech" est prête à recevoir les articles curés par l\'agent.'
      },
      {
        instruction: 'Créez un nouvel agent nommé <code>Veilleur Web</code>. Ajoutez la base "Veille Tech" comme Data source.',
        expected: 'L\'agent est créé avec la base dans ses sources de données.'
      },
      {
        instruction: 'Dans Settings, activez le toggle <strong>Web access</strong>.',
        expected: 'L\'option Web access est activée. L\'agent peut maintenant chercher et lire des pages web.'
      },
      {
        instruction: 'Dans <strong>Triggers</strong>, ajoutez un trigger <strong>Weekly schedule</strong>. Choisissez le lundi à 8h00.',
        expected: 'Le trigger apparaît : "Runs weekly on Monday at 8:00 AM". Chaque lundi matin, l\'agent préparera le digest de la semaine.'
      },
      {
        instruction: 'Rédigez les instructions de veille. Copiez le texte ci-dessous et <strong>adaptez les sujets</strong> à vos centres d\'intérêt.',
        expected: 'Les instructions sont enregistrées.',
        copyable: 'Tu es un veilleur technologique. Chaque semaine, tu fais une revue de l\'actualité et crées un digest.\n\n## Sujets à surveiller\n- Agents IA et LLMs (nouveaux modèles, cas d\'usage, bonnes pratiques)\n- Product management (méthodes, outils, tendances)\n- Outils no-code / low-code (Notion, automatisation)\n\n## Tâche\n1. Cherche sur le web les articles, blog posts, et annonces les plus pertinents de la semaine dernière sur ces sujets\n2. Sélectionne les 5 à 8 articles les plus pertinents\n3. Pour chaque article, crée une page dans la base "Veille Tech" avec :\n   - **Titre** : titre de l\'article en français (traduis si nécessaire)\n   - **Date de publication** : date de l\'article\n   - **Source** : URL de l\'article\n   - **Thème** : catégorie la plus pertinente\n   - **Pertinence** : Haute si c\'est un article majeur, Moyenne sinon\n   - **Contenu** : résumé en 3-5 bullet points + pourquoi c\'est pertinent pour une équipe tech\n\n## Règles\n- Cite TOUJOURS l\'URL source — jamais d\'article sans lien vérifiable\n- Privilégie les sources fiables (blogs officiels, médias tech reconnus)\n- Écris en français même si les sources sont en anglais\n- Ne recommande PAS d\'articles datant de plus de 10 jours'
      },
      {
        instruction: 'Testez dans l\'onglet <strong>Chat</strong> en envoyant : <code>Fais la veille de cette semaine</code>.',
        expected: 'L\'agent browse le web, sélectionne des articles, et crée des pages dans "Veille Tech". Chaque page a un titre, une source URL, un thème, et un résumé.'
      },
      {
        instruction: 'Vérifiez les pages créées. Cliquez sur les <strong>URLs sources</strong> pour valider qu\'elles existent réellement et correspondent au résumé.',
        expected: 'Les URLs pointent vers de vrais articles. Les résumés sont fidèles au contenu. Si un lien est cassé, notez-le — c\'est un cas d\'hallucination à corriger dans les instructions.'
      },
      {
        instruction: 'Affinez les instructions si nécessaire. Ajoutez ou retirez des sujets, changez le nombre d\'articles, ou précisez les sources préférées. Re-testez dans Chat.',
        expected: 'Le résultat s\'améliore à chaque itération. L\'agent produit un digest cohérent et actionnable.'
      }
    ],
    apis: [
      { name: 'Web browsing',
        from: 'Custom Agent capability',
        detail: 'Permet à l\'agent de <strong>chercher et lire des pages web</strong> en temps réel. L\'agent peut naviguer sur des sites, lire des articles, et extraire des informations. Puissance immense mais <strong>risque d\'hallucination</strong> : toujours exiger les URLs sources dans les instructions. Le web browsing consomme plus de tokens que la lecture Notion.' },
      { name: 'Weekly schedule trigger',
        from: 'Scheduled trigger',
        detail: 'Trigger planifié avec une fréquence <strong>hebdomadaire</strong>. Vous choisissez le jour et l\'heure. Idéal pour les digests, rapports de veille, et revues périodiques. Moins de bruit qu\'un trigger daily, plus réactif qu\'un monthly. Pour la veille, le lundi matin est le sweet spot.' },
      { name: 'Content generation',
        from: 'Pattern',
        detail: 'Pattern où l\'agent ne se contente pas de résumer des données existantes — il <strong>génère du contenu original</strong> (résumés, analyses, recommandations) à partir de sources multiples. La qualité dépend de la précision des instructions sur le <strong>format</strong>, le <strong>ton</strong>, et les <strong>critères de sélection</strong>.' },
      { name: 'Curation automatique',
        from: 'Pattern',
        detail: 'Pattern de veille : l\'agent parcourt des sources, <strong>filtre</strong> selon des critères de pertinence, et <strong>structure</strong> les résultats dans une base Notion. L\'humain n\'a plus qu\'à lire le digest. La clé : définir des critères de sélection précis pour éviter le bruit (<code>"5 à 8 articles max"</code>, <code>"sources fiables uniquement"</code>).' }
    ],
    shared: [
      { concept: 'Web browsing', targets: ['07'] }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 06 — Le Standup Bot
  // ──────────────────────────────────────────────────────────
  {
    id: '06', section: 'branches', title: 'Le Standup Bot', layer: 'triggers', done: true, jourJ: false,
    concepts: 'Combinaison scheduled + Slack output, multi-database reading, instructions date-aware, résumé automatique',
    prereqs: ['02', '03'],
    insights: [
      '<strong>Le vrai pouvoir des agents apparaît quand on combine les briques.</strong> Ici, on mélange un trigger planifié (exercice 01), la lecture multi-base (exercice 02), et l\'envoi Slack (exercice 03). Chaque brique est simple — c\'est la combinaison qui crée la valeur.',
      '<strong>Les instructions "date-aware" sont un pattern avancé.</strong> L\'agent doit comprendre "hier" et "aujourd\'hui" sans que vous mettiez à jour les instructions chaque jour. Utilisez des formulations relatives : <code>"les changements des dernières 24 heures"</code> plutôt que des dates en dur.',
      '<strong>L\'envoi Slack transforme un agent passif en agent proactif.</strong> Au lieu d\'attendre que quelqu\'un consulte Notion, l\'agent pousse l\'information là où l\'équipe regarde déjà — dans le channel Slack du projet.'
    ],
    steps: [
      {
        instruction: 'Identifiez 2-3 bases de données Notion qui représentent l\'activité de votre équipe (ex : <code>Tâches</code>, <code>Bugs</code>, <code>Sprints</code>). Assurez-vous qu\'elles ont des propriétés de statut et de date.',
        expected: 'Vous avez identifié les bases qui reflètent l\'activité quotidienne de l\'équipe.'
      },
      {
        instruction: 'Créez un nouvel agent nommé <code>Standup Bot</code>. Ajoutez les 2-3 bases comme <strong>Data sources</strong>.',
        expected: 'L\'agent est créé avec toutes les bases de projet dans ses sources.'
      },
      {
        instruction: 'Dans <strong>Triggers</strong>, ajoutez un trigger <strong>Daily schedule</strong> à <strong>9h15</strong> (après l\'heure d\'arrivée de l\'équipe, avant le standup meeting).',
        expected: 'Le trigger apparaît : "Runs daily at 9:15 AM".'
      },
      {
        instruction: 'Configurez l\'<strong>envoi Slack</strong> comme action de sortie. Dans les capacités de l\'agent, activez Slack et sélectionnez le channel cible (ex : <code>#team-product</code>).',
        expected: 'L\'agent peut maintenant poster dans le channel Slack choisi.'
      },
      {
        instruction: 'Rédigez les instructions du standup bot. Copiez le texte ci-dessous.',
        expected: 'Les instructions sont enregistrées.',
        copyable: 'Tu es le standup bot de l\'équipe. Chaque matin, tu prépares un résumé de l\'activité et le postes sur Slack.\n\n## Tâche\nAnalyse les changements des dernières 24 heures dans toutes les bases de données :\n- Tâches/tickets créés hier\n- Tâches/tickets terminés hier\n- Tâches/tickets dont le statut a changé\n- Bugs critiques ouverts\n\n## Format du message Slack\n📊 **Standup du [date du jour]**\n\n✅ **Terminé hier**\n- [liste des tâches terminées avec le responsable]\n\n🔄 **En cours**\n- [liste des tâches dont le statut a changé]\n\n🆕 **Nouveau**\n- [liste des nouvelles tâches/tickets]\n\n🔥 **Points d\'attention**\n- [bugs critiques, deadlines proches, blocages]\n\nSi une section est vide, ne l\'affiche pas.\n\n## Règles\n- "Dernières 24 heures" = depuis hier à la même heure\n- Écris en français\n- Sois concis : une ligne par item, pas de détails superflus\n- Termine par un message encourageant si tout va bien, ou un warning si des blocages existent'
      },
      {
        instruction: 'Testez dans l\'onglet <strong>Chat</strong> : <code>Prépare le standup d\'aujourd\'hui</code>. Vérifiez le format et le contenu.',
        expected: 'L\'agent produit un message structuré avec les sections emoji. Les données correspondent aux changements réels dans vos bases.'
      },
      {
        instruction: 'Vérifiez que le message serait lisible sur Slack : pas trop long ? Les sections sont-elles claires ? Ajustez les instructions si nécessaire.',
        expected: 'Le message est concis (< 15 lignes idéalement), bien structuré, et donne une vue d\'ensemble rapide de l\'activité.'
      },
      {
        instruction: 'Activez l\'agent et attendez le lendemain matin (ou modifiez temporairement le trigger pour un test immédiat). Vérifiez que le message apparaît dans le channel Slack.',
        expected: 'Le message Slack arrive dans le channel à l\'heure configurée. L\'Activity log confirme l\'exécution avec le statut Success.'
      }
    ],
    apis: [
      { name: 'Scheduled + Slack output',
        from: 'Pattern combiné',
        detail: 'Combine un <strong>trigger planifié</strong> (quand lancer l\'agent) avec un <strong>envoi Slack</strong> (où poster le résultat). L\'agent lit les données Notion à intervalles réguliers et pousse un résumé dans Slack. C\'est le pattern "push" : l\'information va vers l\'équipe, pas l\'inverse.' },
      { name: 'Multi-database reading',
        from: 'Custom Agent',
        detail: 'L\'agent lit simultanément <strong>plusieurs bases Notion</strong> et synthétise les informations. Chaque base ajoutée comme Data source est accessible dans les instructions. Pour un standup, c\'est essentiel : l\'activité est répartie dans les tâches, bugs, et sprints.' },
      { name: 'Instructions date-aware',
        from: 'Instructions pattern',
        detail: 'Pattern d\'instructions qui utilisent des <strong>références temporelles relatives</strong> (<code>"dernières 24h"</code>, <code>"cette semaine"</code>) au lieu de dates absolues. L\'agent interprète ces références par rapport à sa date d\'exécution. Évitez les dates en dur dans les instructions — elles deviennent obsolètes dès le lendemain.' },
      { name: 'Envoi de messages Slack',
        from: 'Custom Agent',
        detail: 'L\'agent peut <strong>poster des messages dans des channels Slack publics</strong>. Le message peut contenir du formatage Slack (bold, emoji, listes). Limitation : pas d\'accès aux channels privés ni aux DMs. Le message apparaît comme venant de l\'agent Notion, pas d\'un utilisateur.' }
    ],
    shared: []
  },

  // ──────────────────────────────────────────────────────────
  // 07 — L'Assistant d'Onboarding
  // ──────────────────────────────────────────────────────────
  {
    id: '07', section: 'branches', title: 'L\'Assistant d\'Onboarding', layer: 'advanced', done: true, jourJ: false,
    concepts: 'Multi-step workflow, multiple data sources, Notion + Slack combined output, personnalisation dynamique',
    prereqs: ['04', '05'],
    insights: [
      '<strong>Cet agent est un workflow complet en une seule configuration.</strong> Détection d\'un nouvel arrivant → création de checklist personnalisée → recherche de ressources pertinentes → message de bienvenue Slack. Quatre étapes, zéro intervention humaine. C\'est le niveau "enterprise" des Custom Agents.',
      '<strong>La personnalisation dynamique est la clé.</strong> L\'agent ne crée pas une checklist générique — il adapte le contenu au <strong>rôle</strong> de la personne (dev, PM, designer) en piochant les bonnes ressources dans la knowledge base. C\'est la différence entre un template statique et un workflow intelligent.',
      '<strong>Combiner Notion + Slack dans un même agent crée une expérience d\'onboarding fluide.</strong> Le nouvel arrivant reçoit un message Slack chaleureux avec un lien vers sa checklist Notion personnalisée. Il sait exactement par où commencer.'
    ],
    steps: [
      {
        instruction: 'Préparez les bases nécessaires : <strong>(1)</strong> <code>Équipe</code> avec les propriétés Name, Rôle (select : Dev, PM, Designer, Data), Date d\'arrivée (date), Email (email). <strong>(2)</strong> <code>Knowledge Base</code> avec les propriétés Title, Catégorie (select), Public cible (multi-select : Dev, PM, Designer, Data, Tous). <strong>(3)</strong> <code>Onboarding Checklists</code> avec Title, Personne (relation vers Équipe), Statut (select).',
        expected: 'Les trois bases existent. La Knowledge Base contient déjà quelques pages de documentation (guides, process, outils).'
      },
      {
        instruction: 'Ajoutez 5-10 pages dans la <code>Knowledge Base</code> avec des publics cibles variés (ex : "Guide Git" pour Dev, "Process Discovery" pour PM, "Design System" pour Designer, "Valeurs d\'équipe" pour Tous).',
        expected: 'La Knowledge Base contient des ressources tagguées par public cible. L\'agent utilisera ces tags pour personnaliser la checklist.'
      },
      {
        instruction: 'Créez un nouvel agent nommé <code>Onboarding Assistant</code>. Ajoutez les <strong>trois bases</strong> comme Data sources. Activez <strong>Slack</strong> et <strong>Web browsing</strong>.',
        expected: 'L\'agent a accès aux trois bases, à Slack, et au web. Il peut lire l\'équipe, chercher dans la KB, créer des checklists, et poster sur Slack.'
      },
      {
        instruction: 'Dans <strong>Triggers</strong>, ajoutez un trigger <strong>Database event &rarr; Page created</strong> sur la base "Équipe".',
        expected: 'Le trigger apparaît : "When a page is created in Équipe". Chaque nouvel arrivant ajouté à la base déclenchera l\'agent.'
      },
      {
        instruction: 'Rédigez les instructions du workflow d\'onboarding. Copiez le texte ci-dessous.',
        expected: 'Les instructions sont enregistrées.',
        copyable: 'Tu es l\'assistant d\'onboarding de l\'équipe. Quand une nouvelle personne est ajoutée à la base "Équipe", tu orchestres son accueil.\n\n## Étape 1 — Lecture du profil\nLis les propriétés de la nouvelle personne : nom, rôle, date d\'arrivée.\n\n## Étape 2 — Création de la checklist\nCrée une nouvelle page dans la base "Onboarding Checklists" :\n- **Titre** : "Onboarding — [Prénom] ([Rôle])"\n- **Personne** : lien vers la fiche dans la base Équipe\n- **Statut** : "En cours"\n\n## Étape 3 — Personnalisation du contenu\nDans le body de la checklist, crée les sections suivantes :\n\n### 🏢 Général (pour tous)\n- [ ] Lire les valeurs d\'équipe\n- [ ] Configurer ses accès (lister les outils trouvés dans la KB tagués "Tous")\n- [ ] Rencontrer son buddy\n\n### 🎯 Spécifique au rôle\nCherche dans la Knowledge Base les ressources dont le "Public cible" inclut le rôle de la personne. Pour chaque ressource trouvée, ajoute une tâche avec un lien vers la page :\n- [ ] Lire [Titre de la ressource] — [lien]\n\n### 🌐 Ressources complémentaires\nUtilise le web browsing pour trouver 2-3 articles d\'introduction pertinents pour le rôle (ex : "getting started as PM in a travel tech company"). Ajoute-les avec les URLs.\n\n## Étape 4 — Message Slack\nPoste un message de bienvenue dans le channel #general :\n"👋 Bienvenue à [Prénom] qui rejoint l\'équipe en tant que [Rôle] ! Sa checklist d\'onboarding est prête : [lien vers la checklist]. N\'hésitez pas à vous présenter !"\n\n## Règles\n- Écris en français\n- La checklist doit contenir entre 8 et 15 tâches (pas plus, pour ne pas overwhelm)\n- Chaque tâche doit être actionnable (commence par un verbe)\n- Si le rôle n\'est pas renseigné, utilise la section "Général" uniquement'
      },
      {
        instruction: 'Testez en créant une nouvelle personne dans la base "Équipe" : <code>Alex Martin</code>, rôle <code>Dev</code>, date d\'arrivée la semaine prochaine.',
        expected: 'L\'agent s\'exécute et crée une page "Onboarding — Alex (Dev)" dans la base Checklists, avec des tâches générales + spécifiques Dev (Guide Git, etc.) + ressources web.'
      },
      {
        instruction: 'Vérifiez la checklist créée : est-elle personnalisée pour le rôle Dev ? Les liens vers la Knowledge Base fonctionnent-ils ? Les ressources web sont-elles pertinentes ?',
        expected: 'La checklist contient des tâches générales (valeurs, accès) et des tâches spécifiques Dev (Git, code review, etc.). Les liens Notion et web fonctionnent.'
      },
      {
        instruction: 'Vérifiez le message Slack dans #general et l\'<strong>Activity log</strong>. Testez avec un autre rôle (PM ou Designer) pour vérifier la personnalisation.',
        expected: 'Le message de bienvenue est posté avec le bon nom et rôle. Un test avec un rôle différent produit une checklist différente. L\'Activity log montre toutes les étapes du workflow.'
      }
    ],
    apis: [
      { name: 'Multi-step workflow',
        from: 'Pattern avancé',
        detail: 'Un agent qui exécute <strong>plusieurs étapes séquentielles</strong> dans un seul trigger : lire → créer → enrichir → notifier. Les instructions structurées en étapes numérotées guident l\'agent dans l\'ordre des opérations. C\'est le pattern le plus complexe — chaque étape dépend du résultat de la précédente.' },
      { name: 'Multiple data sources',
        from: 'Custom Agent',
        detail: 'L\'agent accède à <strong>3+ bases Notion simultanément</strong>. Il peut lire dans une base (Équipe), chercher dans une autre (Knowledge Base), et écrire dans une troisième (Checklists). Plus il y a de sources, plus les instructions doivent être <strong>explicites</strong> sur quelle base utiliser pour quoi.' },
      { name: 'Notion + Slack combined',
        from: 'Pattern combiné',
        detail: 'L\'agent <strong>crée du contenu dans Notion ET notifie sur Slack</strong> dans la même exécution. Le message Slack contient idéalement un <strong>lien vers la page Notion</strong> créée, créant un pont fluide entre les deux outils. C\'est le pattern d\'expérience utilisateur le plus abouti.' },
      { name: 'Personnalisation dynamique',
        from: 'Pattern avancé',
        detail: 'L\'agent <strong>adapte son output selon les propriétés</strong> de l\'élément déclencheur. Ici, le rôle de la personne détermine quelles ressources inclure dans la checklist. C\'est la différence entre un template statique et une automatisation intelligente — l\'agent prend des <strong>décisions contextuelles</strong>.' },
      { name: 'Permissions de l\'agent',
        from: 'Custom Agent',
        detail: 'Trois niveaux de permissions : <strong>Full Access</strong> (lire + écrire + configurer), <strong>Can Edit</strong> (lire + écrire), <strong>Can View and Interact</strong> (lire + utiliser Chat). Pour un agent d\'onboarding qui crée des pages et poste sur Slack, <strong>Full Access</strong> ou <strong>Can Edit</strong> est nécessaire.' }
    ],
    shared: []
  },

  // ──────────────────────────────────────────────────────────
  // 08 — Craft d'Instructions
  // ──────────────────────────────────────────────────────────
  {
    id: '08', section: 'branches', title: 'Craft d\'Instructions', layer: 'advanced', done: true, jourJ: false,
    concepts: 'Prompt engineering, instruction structure, testing methodology, output templates, guardrails',
    prereqs: ['01'],
    insights: [
      '<strong>Les instructions d\'un agent sont un programme — pas un souhait.</strong> Un agent avec des instructions vagues ("résume bien les trucs") est aussi utile qu\'un programme sans spécification. La structure <code>Rôle → Tâche → Format → Contraintes</code> transforme un agent médiocre en agent fiable.',
      '<strong>Les instructions négatives sont souvent plus fiables que les positives.</strong> Dire <code>"Ne résume JAMAIS en plus de 5 bullet points"</code> est plus efficace que <code>"Résume en 5 bullet points"</code>. L\'agent a tendance à ignorer les souhaits mais respecte les interdictions. Utilisez <code>JAMAIS</code>, <code>NE PAS</code>, <code>INTERDIT</code>.',
      '<strong>Le Chat tab est votre laboratoire scientifique.</strong> Changez une seule variable à la fois dans les instructions, testez, observez. C\'est la méthode expérimentale appliquée au prompt engineering. 10 minutes d\'itération dans le Chat > 1 heure de réflexion théorique.'
    ],
    steps: [
      {
        instruction: 'Choisissez un agent que vous avez créé dans un exercice précédent (ex : Daily Digest, Trieur Automatique, ou un autre). Ouvrez ses <strong>instructions actuelles</strong>.',
        expected: 'Vous avez un agent fonctionnel avec des instructions de base. L\'objectif est d\'améliorer systématiquement la qualité de ses outputs.'
      },
      {
        instruction: 'Faites un <strong>test de baseline</strong> : dans l\'onglet Chat, envoyez une requête typique et notez le résultat. Identifiez ce qui pourrait être amélioré (format, pertinence, niveau de détail, ton).',
        expected: 'Vous avez un résultat "avant" à comparer. Notez 2-3 points d\'amélioration concrets (ex : "trop verbeux", "manque les priorités", "pas assez structuré").'
      },
      {
        instruction: 'Restructurez les instructions en 4 sections. Copiez le template ci-dessous et adaptez-le à votre agent.',
        expected: 'Les instructions sont maintenant organisées en sections claires avec une structure lisible.',
        copyable: '## Rôle\nTu es [description précise du rôle]. Tu travailles pour [contexte de l\'équipe/entreprise].\n\n## Tâche\n[Description exacte de ce que l\'agent doit faire, étape par étape]\n\n## Format de sortie\n[Template exact du format attendu — l\'agent suivra ce modèle]\nExemple :\n- **[Titre]** — [description en une phrase] (Priorité : [Haute/Moyenne/Basse])\n\n## Contraintes\n- Ne dépasse JAMAIS [X] éléments dans la liste\n- N\'inclus PAS [ce qui doit être exclu]\n- Si [cas limite], alors [comportement attendu]\n- Écris TOUJOURS en français\n- Si tu n\'as pas assez d\'information, dis-le explicitement au lieu d\'inventer'
      },
      {
        instruction: 'Ajoutez des <strong>exemples concrets</strong> dans vos instructions. Montrez à l\'agent exactement à quoi devrait ressembler un bon output.',
        expected: 'Les instructions contiennent un exemple de sortie idéale. L\'agent a un modèle à suivre.',
        copyable: '## Exemple de sortie attendue\nVoici un exemple de résultat idéal :\n\n✅ **Terminé hier**\n- **Refonte page d\'accueil** — Déployé en production (Marie)\n- **Fix bug connexion** — Corrigé et testé (Pierre)\n\n🔥 **Points d\'attention**\n- **Migration base de données** — Bloqué en attente du DBA (Priorité : Haute)\n\n---\nSuis ce format exactement. Ne rajoute PAS de sections supplémentaires.'
      },
      {
        instruction: 'Ajoutez des <strong>instructions négatives</strong> (guardrails) pour éviter les comportements indésirables que vous avez observés.',
        expected: 'Les instructions contiennent des interdictions claires qui préviennent les erreurs récurrentes.',
        copyable: '## Interdictions\n- Ne génère JAMAIS de données fictives — si la base est vide, dis-le\n- N\'ajoute PAS de commentaires meta ("Voici le résumé demandé...")\n- Ne répète PAS le même élément sous deux sections différentes\n- N\'utilise JAMAIS plus de 3 emojis par message\n- Si une propriété est vide, écris "Non renseigné" au lieu de deviner'
      },
      {
        instruction: 'Testez la version améliorée dans <strong>Chat</strong> avec la même requête qu\'au step 2. Comparez les résultats "avant" et "après".',
        expected: 'Le résultat est visiblement meilleur : plus structuré, plus concis, et sans les défauts identifiés. La différence vient de la structure des instructions.'
      },
      {
        instruction: 'Faites un <strong>test edge case</strong> : que se passe-t-il quand la base est vide ? Quand il y a 50 entrées ? Quand le contenu est en anglais ? Ajustez les instructions en conséquence.',
        expected: 'L\'agent gère correctement les cas limites grâce aux contraintes et au cas par défaut définis dans les instructions.'
      },
      {
        instruction: 'Documentez votre <strong>méthodologie de test</strong>. Dans une page Notion, notez : (1) les instructions finales, (2) les tests effectués, (3) les résultats, (4) les itérations qui ont fait la différence.',
        expected: 'Vous avez une page de référence avec vos instructions optimisées et votre processus d\'itération. C\'est réutilisable pour tout futur agent.'
      }
    ],
    apis: [
      { name: 'Structure d\'instructions (Rôle/Tâche/Format/Contraintes)',
        from: 'Prompt engineering',
        detail: 'Framework en 4 sections pour structurer les instructions d\'un agent : <strong>Rôle</strong> (qui est l\'agent), <strong>Tâche</strong> (quoi faire), <strong>Format</strong> (comment présenter), <strong>Contraintes</strong> (limites et interdictions). Cette structure force la clarté et réduit l\'ambiguïté. Un agent bien structuré est un agent prévisible.' },
      { name: 'Instructions négatives (guardrails)',
        from: 'Prompt engineering',
        detail: 'Les interdictions explicites (<code>"Ne fais JAMAIS X"</code>) sont <strong>souvent plus efficaces que les souhaits positifs</strong>. L\'agent LLM a tendance à interpréter les instructions positives avec flexibilité, mais respecte les interdictions strictes. Utilisez des mots forts : <code>JAMAIS</code>, <code>NE PAS</code>, <code>INTERDIT</code>, <code>TOUJOURS</code>.' },
      { name: 'Exemples dans les instructions (few-shot)',
        from: 'Prompt engineering',
        detail: 'Inclure un <strong>exemple concret de sortie attendue</strong> dans les instructions. C\'est le pattern "few-shot" : l\'agent imite le format de l\'exemple. Un exemple vaut 100 mots d\'explication. Montrez exactement le format, le niveau de détail, et le ton attendus.' },
      { name: 'Output templates',
        from: 'Prompt engineering',
        detail: 'Définir un <strong>template de sortie</strong> que l\'agent doit suivre exactement. Au lieu de "fais un résumé", donnez le squelette : <code>"## Titre\\n- Point 1\\n- Point 2\\n## Actions"</code>. L\'agent remplit le template au lieu d\'inventer un format — résultat plus cohérent et prévisible.' },
      { name: 'Méthodologie de test',
        from: 'Prompt engineering',
        detail: 'Approche scientifique du prompt engineering : <strong>(1)</strong> Baseline — tester l\'état actuel, <strong>(2)</strong> Hypothèse — identifier un point d\'amélioration, <strong>(3)</strong> Modification — changer UNE variable, <strong>(4)</strong> Test — vérifier dans Chat, <strong>(5)</strong> Itérer. Changez une seule chose à la fois pour savoir ce qui fait la différence.' },
      { name: 'Version history',
        from: 'Custom Agent',
        detail: 'Les Custom Agents disposent d\'un <strong>historique de versions</strong>. Vous pouvez consulter les configurations passées de votre agent et les restaurer si nécessaire. C\'est un filet de sécurité essentiel pour le processus itératif : expérimentez librement dans vos instructions, vous pourrez toujours revenir en arrière si une modification dégrade les résultats.' }
    ],
    shared: []
  }
];

// ════════════════════════════════════════════════════════════
// MUTATIONS — Code morphing data for connections
// (No code mutations for Notion Custom Agents — this is a
// no-code learning path, so morphing doesn't apply)
// ════════════════════════════════════════════════════════════
const MUTATIONS = [];

// ════════════════════════════════════════════════════════════
// LAYER METADATA — Layer definitions for the learning map
// ════════════════════════════════════════════════════════════
const LAYER_META = {
  basics: {
    label: 'Basics',
    className: 'layer--basics',
    glowColor: 'var(--basics-glow)',
    lineColor: 'var(--basics-line)',
    tagline: 'Premiers agents & fondamentaux',
    buildsOn: 'Point de départ<br>créez vos deux premiers agents autonomes',
    tooltip: '<strong>Basics</strong> couvre les fondamentaux des Custom Agents Notion. Vous créez un agent de résumé quotidien (trigger planifié) et un trieur automatique (trigger événementiel). Ces deux exercices posent les bases : instructions, data sources, triggers, et le cycle de test dans le Chat tab.'
  },
  triggers: {
    label: 'Triggers & Intégrations',
    className: 'layer--triggers',
    glowColor: 'var(--triggers-glow)',
    lineColor: 'var(--triggers-line)',
    tagline: 'Slack, événements & workflows réactifs',
    buildsOn: 'Construit sur Basics<br>ajoute Slack, extraction structurée, standup automatisé',
    tooltip: '<strong>Triggers & Intégrations</strong> rend vos agents réactifs et connectés. Vous créez un pont Slack↔Notion (emoji → ticket), un extracteur d\'actions de meeting, et un standup bot qui combine lecture multi-base + envoi Slack. C\'est ici que l\'automatisation devient vraiment utile au quotidien.'
  },
  advanced: {
    label: 'Advanced Patterns',
    className: 'layer--advanced',
    glowColor: 'var(--advanced-glow)',
    lineColor: 'var(--advanced-line)',
    tagline: 'Web, multi-step workflows & craft',
    buildsOn: 'Construit sur Triggers<br>ajoute web browsing, workflows complexes, prompt engineering',
    tooltip: '<strong>Advanced Patterns</strong> pousse les agents à leur maximum. Veille web automatisée, onboarding multi-étapes avec personnalisation dynamique, et un exercice meta sur le craft d\'instructions. C\'est ici que vous passez de "ça marche" à "ça marche vraiment bien".'
  }
};
