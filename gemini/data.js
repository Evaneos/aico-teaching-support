// ════════════════════════════════════════════════════════════
// DATA — Exercise nodes and layer metadata for the Gemini learning map
// De ChatGPT à Gemini — Evaneos Workspace Migration
// 8 exercises across 3 layers: transition, workspace, mastery
// ════════════════════════════════════════════════════════════

const EXERCISES = [
  {
    id: '01', section: 'trunk', title: 'Retrouver ses Repères', layer: 'transition', done: true, jourJ: true,
    concepts: 'interface Gemini, équivalences ChatGPT, historique, paramètres, compte Google',
    insights: [
      '<strong>Gemini est déjà connecté à votre compte Google</strong> — pas de login séparé, pas d\'abonnement supplémentaire. C\'est inclus dans votre plan Google Workspace Business.',
      'L\'interface de conversation est quasi identique à ChatGPT. La vraie différence n\'est pas dans le chat — ce sont les <strong>intégrations Workspace</strong> que vous découvrirez dans les exercices suivants.',
      'Contrairement à ChatGPT, Gemini peut accéder directement à votre <strong>Google Drive, Gmail et Calendar</strong> via les extensions. C\'est l\'avantage clé de cette migration.'
    ],
    steps: [
      { instruction: 'Ouvrez Gemini dans votre navigateur', expected: 'La page d\'accueil Gemini s\'affiche, vous êtes automatiquement connecté avec votre compte Evaneos', copyable: 'https://gemini.google.com' },
      { instruction: 'Lancez une première conversation en posant une question simple', expected: 'Gemini répond dans une interface similaire à ChatGPT : champ de saisie en bas, réponse au-dessus', copyable: 'Explique-moi en 3 phrases ce que fait Evaneos' },
      { instruction: 'Retrouvez l\'historique de vos conversations dans le panneau latéral gauche', expected: 'Le panneau latéral affiche vos conversations récentes, comme la sidebar de ChatGPT' },
      { instruction: 'Vérifiez que vous utilisez bien Gemini Advanced (modèle le plus puissant)', expected: 'Le sélecteur de modèle en haut indique "Gemini Advanced" ou "1.5 Pro" — équivalent de GPT-4 chez ChatGPT' },
      { instruction: 'Ouvrez les paramètres Gemini (icône engrenage ou menu)', expected: 'La page de paramètres s\'affiche : langue, extensions, thème — c\'est l\'équivalent des "Custom Instructions" de ChatGPT' },
      { instruction: 'Comparez la qualité de réponse : posez la même question que vous poseriez à ChatGPT', expected: 'La réponse est comparable en qualité. Notez les différences de style : Gemini tend à être plus structuré avec des listes', copyable: 'Rédige un email de relance poli pour un partenaire qui n\'a pas répondu depuis 2 semaines' },
      { instruction: 'Testez la fonctionnalité "Modifier la réponse" (icône crayon sous la réponse)', expected: 'Un menu propose de rendre la réponse plus courte, plus longue, plus simple, plus professionnelle — similaire au "Regenerate" de ChatGPT mais avec plus d\'options' }
    ],
    apis: [
      { name: 'Gemini Advanced',
        from: 'Google Workspace',
        detail: 'Le modèle le plus puissant de Gemini, <strong>équivalent de GPT-4</strong> chez ChatGPT. Inclus dans votre abonnement Google Workspace Business — pas de coût supplémentaire. Il alimente toutes les intégrations Workspace (Gmail, Meet, Slides).' },
      { name: 'Historique des conversations',
        from: 'interface Gemini',
        detail: 'Toutes vos conversations sont sauvegardées dans le <strong>panneau latéral gauche</strong>, exactement comme dans ChatGPT. Vous pouvez les renommer, les supprimer, ou les épingler. L\'historique est lié à votre compte Google.' },
      { name: 'Paramètres & préférences',
        from: 'interface Gemini',
        detail: 'L\'équivalent des <strong>Custom Instructions</strong> de ChatGPT. Vous y trouverez les réglages de langue, de thème, et surtout la gestion des <strong>extensions</strong> (Drive, Gmail, YouTube) qui sont le vrai différenciateur.' },
      { name: 'Modifier la réponse',
        from: 'interface Gemini',
        detail: 'Sous chaque réponse, des options permettent de <strong>reformuler en un clic</strong> : plus court, plus long, plus simple, plus professionnel. Plus pratique que le "Regenerate" de ChatGPT car vous choisissez la direction du changement.' }
    ],
    code: null,
    prereqs: [],
    shared: [
      { concept: 'Gemini interface', targets: ['02', '03', '04', '07'] }
    ]
  },
  {
    id: '02', section: 'trunk', title: 'Mes GPTs deviennent des Gems', layer: 'transition', done: true, jourJ: true,
    concepts: 'Gems, migration GPTs, instructions, prompt engineering, Gem manager',
    insights: [
      'Il n\'y a <strong>AUCUNE migration automatique</strong> GPT → Gem. Vous devez reconstruire manuellement. La bonne nouvelle : la plupart des GPTs sont à 90% du texte d\'instructions — un copier-coller vous amène à 80% du résultat.',
      'Les Gems sont <strong>plus simples que les GPTs</strong> — pas d\'Actions (appels API), pas de Code Interpreter, pas d\'upload de fichier dans la config. Mais pour les GPTs basés sur des instructions (la majorité), la transition est directe.',
      'Les instructions de Gems supportent les <strong>mêmes patterns de prompt engineering</strong> : rôle, contexte, format, contraintes. Vos compétences de prompting ChatGPT se transfèrent directement.'
    ],
    steps: [
      { instruction: 'Dans ChatGPT, allez dans "Explore GPTs" puis "My GPTs" pour lister vos GPTs personnalisés', expected: 'La liste de vos GPTs s\'affiche avec leurs noms et descriptions' },
      { instruction: 'Ouvrez un de vos GPTs et cliquez sur "Edit" pour voir ses instructions', expected: 'Le panneau de configuration s\'ouvre avec le champ "Instructions" — c\'est le texte que vous allez copier' },
      { instruction: 'Sélectionnez et copiez l\'intégralité du texte d\'instructions de votre GPT', expected: 'Le texte est dans votre presse-papiers, prêt à être adapté pour Gemini' },
      { instruction: 'Dans Gemini, ouvrez le Gem Manager depuis le panneau latéral gauche', expected: 'La page Gem Manager s\'affiche avec l\'option "Créer un nouveau Gem"', copyable: 'https://gemini.google.com/gems' },
      { instruction: 'Créez un nouveau Gem : donnez-lui un nom et collez vos instructions dans le champ dédié', expected: 'Le formulaire de création affiche le nom et les instructions. Adaptez le texte si nécessaire (supprimez les références à "ChatGPT" ou "GPT-4")' },
      { instruction: 'Testez votre Gem en lui posant la même question que vous posiez à votre GPT', expected: 'Le Gem répond en suivant les instructions que vous avez définies — le comportement doit être similaire à votre ancien GPT' },
      { instruction: 'Notez les différences : pas d\'Actions (appels API), pas de Code Interpreter dans les Gems', expected: 'Si votre GPT utilisait des Actions ou du Code Interpreter, ces fonctionnalités ne seront pas disponibles dans le Gem — le reste fonctionne' },
      { instruction: 'Répétez l\'opération pour vos 2-3 GPTs les plus utilisés', expected: 'Vos GPTs essentiels sont maintenant disponibles en tant que Gems dans Gemini' }
    ],
    apis: [
      { name: 'Gem Manager',
        from: 'interface Gemini',
        detail: 'L\'équivalent de <strong>"My GPTs"</strong> dans ChatGPT. Accessible depuis le panneau latéral, il liste tous vos Gems et permet d\'en créer de nouveaux. Chaque Gem a un nom, une description et des instructions personnalisées.' },
      { name: 'Instructions de Gem',
        from: 'concept',
        detail: 'Le cœur du Gem : un <strong>prompt système</strong> qui définit le comportement de Gemini. Même logique que les instructions d\'un GPT — rôle, contexte, format de sortie, contraintes. La syntaxe est identique : du texte en langage naturel.' },
      { name: 'Limites des Gems vs GPTs',
        from: 'concept',
        detail: 'Les Gems ne supportent <strong>pas</strong> les Actions (appels API externes), le Code Interpreter (exécution de code Python), ni l\'upload de fichiers dans la configuration. Pour les GPTs qui utilisaient ces fonctionnalités, il faudra trouver des alternatives dans l\'écosystème Workspace.' },
      { name: 'Prompt engineering',
        from: 'concept',
        detail: 'Les techniques de prompting sont <strong>universelles entre ChatGPT et Gemini</strong> : persona/rôle, contexte, format attendu, exemples (few-shot), chaîne de pensée (chain-of-thought). Pas besoin de réapprendre — vos compétences se transfèrent directement.' }
    ],
    code: null,
    prereqs: ['01'],
    shared: [
      { concept: 'Gems', targets: [] }
    ]
  },
  {
    id: '03', section: 'trunk', title: 'Upload & Analyse de Fichiers', layer: 'transition', done: true, jourJ: true,
    concepts: 'upload fichiers, PDF, images, tableurs, analyse native, limites',
    insights: [
      'Gemini gère les <strong>PDFs, images et audio nativement</strong> — pas de plugin nécessaire. Mais il n\'y a pas d\'équivalent au "Code Interpreter" : pour les manipulations de données complexes, Gemini raisonne sur les données mais <strong>ne peut pas exécuter de code Python</strong> comme ChatGPT.',
      'Pour les tableurs, <strong>Gemini dans Google Sheets</strong> (via l\'intégration Workspace) est souvent plus efficace qu\'uploader un CSV dans le chat. Pensez "outil natif" plutôt que "upload dans le chat".',
      'La compréhension d\'images par Gemini est <strong>excellente</strong> — souvent au niveau de GPT-4o ou meilleure. Essayez avec des captures d\'écran, des diagrammes, des photos de tableaux blancs.'
    ],
    steps: [
      { instruction: 'Dans Gemini, cliquez sur l\'icône "+" ou l\'icône de trombone pour uploader un fichier', expected: 'Un sélecteur de fichiers s\'ouvre, vous pouvez choisir un fichier depuis votre ordinateur ou Google Drive' },
      { instruction: 'Uploadez un PDF (rapport, présentation, document) et demandez un résumé', expected: 'Gemini lit le PDF et produit un résumé structuré — similaire à ChatGPT avec le même type de document', copyable: 'Résume ce document en 5 points clés et identifie les actions à mener' },
      { instruction: 'Uploadez une image (capture d\'écran, diagramme, ou photo) et demandez une analyse', expected: 'Gemini décrit l\'image en détail, extrait le texte visible, et répond à vos questions sur le contenu visuel', copyable: 'Décris cette image en détail. Que montre-t-elle ? Y a-t-il du texte visible ?' },
      { instruction: 'Uploadez un fichier CSV ou Excel et posez des questions sur les données', expected: 'Gemini analyse la structure des données et répond à vos questions — mais sans exécuter de code, il raisonne sur les données textuellement', copyable: 'Quelles sont les tendances principales dans ces données ? Y a-t-il des anomalies ?' },
      { instruction: 'Testez les limites : demandez un calcul complexe sur vos données tabulaires', expected: 'Gemini tente de raisonner mais peut faire des erreurs de calcul — c\'est la limite principale vs le Code Interpreter de ChatGPT' },
      { instruction: 'Comparez avec votre expérience ChatGPT : notez ce qui fonctionne pareil et ce qui diffère', expected: 'Résumé PDF ≈ identique, analyse d\'images ≈ identique ou meilleure, manipulation de données = moins puissant sans Code Interpreter' }
    ],
    apis: [
      { name: 'Upload de fichiers',
        from: 'interface Gemini',
        detail: 'Gemini accepte les <strong>PDFs, images (PNG, JPG, WebP), fichiers texte, CSV et audio</strong>. L\'upload se fait via l\'icône trombone ou "+" dans le champ de saisie. Les fichiers peuvent aussi être importés directement depuis <strong>Google Drive</strong>.' },
      { name: 'Analyse de PDF',
        from: 'capacité native',
        detail: 'Gemini lit les PDFs page par page et peut <strong>résumer, extraire des informations, répondre à des questions</strong> sur le contenu. Fonctionne aussi bien qu\'avec ChatGPT pour la plupart des documents. Limite : les PDFs très longs (100+ pages) peuvent perdre en précision.' },
      { name: 'Analyse d\'images',
        from: 'capacité native',
        detail: 'Gemini utilise un modèle <strong>multimodal</strong> qui comprend les images nativement : OCR (extraction de texte), description de scènes, lecture de graphiques, analyse de diagrammes. Souvent <strong>au niveau ou meilleur que GPT-4o</strong> sur les images.' },
      { name: 'Limites vs Code Interpreter',
        from: 'concept',
        detail: 'ChatGPT avec Code Interpreter pouvait <strong>exécuter du code Python</strong> sur vos données : calculs précis, graphiques, nettoyage de données. Gemini ne le peut pas — il raisonne textuellement sur les données. Pour les analyses complexes, privilégiez <strong>Google Sheets + Gemini</strong> dans Sheets.' }
    ],
    code: null,
    prereqs: ['01'],
    shared: [
      { concept: 'File upload', targets: ['06'] }
    ]
  },
  {
    id: '04', section: 'trunk', title: 'Gemini dans Gmail', layer: 'workspace', done: true, jourJ: true,
    concepts: 'Gmail, Help me write, résumé de thread, rédaction, ton, réponses suggérées',
    insights: [
      '<strong>"Help me write" dans Gmail</strong> est la fonctionnalité que la plupart des utilisateurs adoptent en premier. C\'est plus rapide que basculer vers le chat Gemini car l\'IA a déjà le contexte de l\'email.',
      'Gemini dans Gmail peut lire le <strong>thread ENTIER</strong> — quelque chose que ChatGPT ne pouvait pas faire sans copier-coller. Cette conscience du contexte est l\'avantage n°1 de l\'intégration Workspace.',
      'Vous pouvez ajuster le <strong>ton</strong> (formel, décontracté, plus court, plus long) en un clic après la génération. Pas besoin de re-prompter.'
    ],
    steps: [
      { instruction: 'Ouvrez Gmail et repérez l\'icône Gemini (étoile/sparkle) dans le panneau latéral droit', expected: 'Le panneau Gemini s\'ouvre sur le côté droit de Gmail, prêt à interagir avec vos emails' },
      { instruction: 'Ouvrez un long thread d\'emails et demandez à Gemini de le résumer', expected: 'Gemini lit l\'ensemble du fil de discussion et produit un résumé avec les points clés et les décisions prises', copyable: 'Résume ce fil de discussion : quels sont les points clés et les décisions prises ?' },
      { instruction: 'Cliquez sur "Nouveau message" puis utilisez "Help me write" (icône Gemini dans la barre d\'outils)', expected: 'Un champ de prompt apparaît dans la zone de rédaction — décrivez ce que vous voulez écrire' },
      { instruction: 'Demandez à Gemini de rédiger un email professionnel', expected: 'Gemini génère un brouillon complet avec objet, salutation, corps et formule de politesse', copyable: 'Rédige un email à notre partenaire pour confirmer les dates du prochain workshop et demander la liste des participants' },
      { instruction: 'Utilisez les options de ton pour ajuster le brouillon généré', expected: 'Des boutons apparaissent sous le brouillon : "Plus formel", "Plus décontracté", "Plus court", "Plus long" — cliquez pour transformer le texte en un clic' },
      { instruction: 'Sur un email reçu, testez les "Réponses suggérées" en bas du message', expected: 'Gemini propose 2-3 réponses courtes contextuelles, comme les Smart Replies de Gmail mais plus élaborées' },
      { instruction: 'Testez le résumé sur un email avec pièce jointe', expected: 'Gemini résume le contenu de l\'email ET mentionne la pièce jointe, facilitant le tri rapide de votre boîte de réception' }
    ],
    apis: [
      { name: 'Help me write',
        from: 'Gmail',
        detail: 'Fonctionnalité de <strong>rédaction assistée</strong> directement dans Gmail. Décrivez en une phrase ce que vous voulez écrire, Gemini génère un brouillon complet. Disponible dans les nouveaux emails et les réponses. <strong>Avantage vs ChatGPT</strong> : le contexte de l\'email est automatiquement inclus.' },
      { name: 'Résumé de thread',
        from: 'Gmail + Gemini',
        detail: 'Gemini peut <strong>résumer un fil de discussion entier</strong> en un clic. Il extrait les points clés, les décisions, et les actions demandées. Particulièrement utile pour les threads de 10+ messages où vous rejoignez la conversation en cours de route.' },
      { name: 'Ajustement de ton',
        from: 'Gmail + Gemini',
        detail: 'Après chaque génération, des <strong>boutons de raffinement</strong> permettent de changer le ton en un clic : formel ↔ décontracté, court ↔ long, simple ↔ élaboré. Plus rapide que de re-prompter dans ChatGPT pour obtenir le bon ton.' },
      { name: 'Panneau latéral Gemini',
        from: 'Gmail',
        detail: 'Un <strong>chat Gemini intégré</strong> dans le panneau droit de Gmail. Vous pouvez lui poser des questions sur vos emails, demander des résumés, ou obtenir de l\'aide pour rédiger — le tout sans quitter Gmail. C\'est comme avoir ChatGPT intégré dans votre boîte mail.' }
    ],
    code: null,
    prereqs: ['01'],
    shared: [
      { concept: 'Gmail integration', targets: ['05', '08'] }
    ]
  },
  {
    id: '05', section: 'trunk', title: 'Gemini dans Meet', layer: 'workspace', done: true, jourJ: false,
    concepts: 'Google Meet, notes automatiques, résumé, action items, transcription',
    insights: [
      'Les notes de réunion sont générées <strong>AUTOMATIQUEMENT</strong> — pas besoin de demander. Après chaque appel Meet avec Gemini activé, un résumé apparaît dans votre Google Drive.',
      'Le résumé inclut les <strong>participants, les sujets clés, les actions à mener avec les responsables assignés</strong>. Ce n\'est pas une transcription — c\'est un résumé structuré et exploitable.',
      'Cela remplace <strong>Otter.ai, Fireflies, ou la prise de notes manuelle</strong>. Un outil de moins à gérer (et à payer).'
    ],
    steps: [
      { instruction: 'Ouvrez les paramètres de Google Meet et vérifiez que Gemini est activé', expected: 'Dans les paramètres Meet, une section "Gemini" ou "AI features" est visible et activée' },
      { instruction: 'Lancez ou rejoignez une réunion Google Meet', expected: 'La réunion démarre. Si Gemini est actif, une indication peut apparaître (icône Gemini ou notification)' },
      { instruction: 'Pendant la réunion, observez les fonctionnalités Gemini en temps réel', expected: 'Gemini peut afficher des sous-titres améliorés et prend des notes en arrière-plan — pas besoin d\'interaction' },
      { instruction: 'Terminez la réunion et retrouvez les notes auto-générées dans Google Drive', expected: 'Un document Google Docs apparaît dans votre Drive avec le titre de la réunion et la date, contenant le résumé' },
      { instruction: 'Examinez le résumé : participants, sujets abordés, décisions prises', expected: 'Le document est structuré en sections : participants, résumé des discussions, points clés, et actions à mener' },
      { instruction: 'Vérifiez les action items : chaque action a un responsable assigné', expected: 'Les actions sont listées avec le nom de la personne responsable, extraites automatiquement de la conversation' },
      { instruction: 'Partagez le résumé avec les participants de la réunion', expected: 'Le document est partageable comme tout Google Doc — les participants peuvent le commenter et compléter' }
    ],
    apis: [
      { name: 'Notes automatiques Meet',
        from: 'Google Meet + Gemini',
        detail: 'Après chaque réunion avec Gemini activé, un <strong>document Google Docs est créé automatiquement</strong> dans votre Drive. Il contient un résumé structuré de la réunion — pas une transcription mot à mot, mais une synthèse exploitable.' },
      { name: 'Action items',
        from: 'Google Meet + Gemini',
        detail: 'Gemini identifie automatiquement les <strong>actions à mener mentionnées pendant la réunion</strong> et les associe aux personnes responsables. Exemple : "Jean va envoyer le rapport d\'ici vendredi" → Action item assigné à Jean.' },
      { name: 'Résumé structuré',
        from: 'Google Meet + Gemini',
        detail: 'Le résumé de réunion est organisé en <strong>sections claires</strong> : participants, sujets abordés, décisions prises, actions à mener. C\'est un format directement exploitable — pas besoin de retravailler les notes.' },
      { name: 'Remplacement d\'outils tiers',
        from: 'concept',
        detail: 'Gemini dans Meet remplace les outils de transcription tiers comme <strong>Otter.ai, Fireflies.ai, ou Tactiq</strong>. Avantage : les notes sont directement dans Google Drive, intégrées à l\'écosystème Workspace. Un abonnement et un outil de moins à gérer.' }
    ],
    code: null,
    prereqs: ['04'],
    shared: []
  },
  {
    id: '06', section: 'branches', title: 'Gemini dans Slides', layer: 'workspace', done: true, jourJ: false,
    concepts: 'Google Slides, Imagen, génération d\'images, création de présentations, design',
    insights: [
      '<strong>"Create image" dans Slides utilise Imagen</strong> (le modèle d\'image de Google). Vous pouvez générer des illustrations, diagrammes et visuels décoratifs directement — pas besoin de Midjourney ou DALL-E.',
      'Gemini comprend le <strong>contexte de la slide</strong>. Demandez "simplifie cette slide" ou "rends-la plus visuelle" et il s\'adapte en fonction du contenu existant.',
      'Pour les présentations, le workflow idéal est : <strong>plan dans Gemini chat → génération dans Slides → affinage avec le panneau Gemini</strong>. Chaque étape reste dans les outils Google.'
    ],
    steps: [
      { instruction: 'Ouvrez Google Slides et créez une nouvelle présentation', expected: 'Une présentation vierge s\'ouvre dans Google Slides' },
      { instruction: 'Repérez le panneau Gemini (icône étoile/sparkle dans la barre latérale ou le menu)', expected: 'Le panneau Gemini s\'ouvre, prêt à vous aider à créer du contenu pour vos slides' },
      { instruction: 'Demandez à Gemini de générer un plan de présentation', expected: 'Gemini propose une structure de slides avec titres et points clés pour chaque slide', copyable: 'Crée un plan de présentation de 6 slides sur le bilan trimestriel de notre activité : résultats, challenges, next steps' },
      { instruction: 'Utilisez "Create image" pour générer un visuel directement dans une slide', expected: 'Gemini/Imagen génère une image basée sur votre description, insérée directement dans la slide', copyable: 'Génère une illustration professionnelle représentant une équipe collaborant autour d\'un globe terrestre, style flat design' },
      { instruction: 'Sélectionnez une slide avec beaucoup de texte et demandez à Gemini de la simplifier', expected: 'Gemini propose une version allégée avec moins de texte et des bullet points plus concis', copyable: 'Simplifie cette slide : garde uniquement les 3 messages clés, sous forme de bullet points courts' },
      { instruction: 'Demandez des suggestions de design pour améliorer une slide', expected: 'Gemini suggère des améliorations visuelles : ajout d\'icônes, réorganisation du layout, changement de couleurs', copyable: 'Comment rendre cette slide plus impactante visuellement ?' },
      { instruction: 'Testez le workflow complet : du plan à la présentation finalisée', expected: 'Vous avez une présentation structurée avec du contenu généré et des visuels — le tout sans quitter Google Slides' }
    ],
    apis: [
      { name: 'Imagen dans Slides',
        from: 'Google Slides + Gemini',
        detail: '<strong>Imagen</strong> est le modèle de génération d\'images de Google, intégré directement dans Slides. Il génère des illustrations, icônes, et visuels à partir d\'une description textuelle. Remplace DALL-E ou Midjourney pour les besoins de présentation.' },
      { name: 'Génération de contenu',
        from: 'Google Slides + Gemini',
        detail: 'Gemini peut <strong>générer des plans de présentation, rédiger le contenu des slides, et reformuler du texte</strong> existant. Il comprend le contexte de la présentation entière — pas juste la slide active.' },
      { name: 'Simplification de slides',
        from: 'Google Slides + Gemini',
        detail: 'Une des fonctionnalités les plus utiles : demandez à Gemini de <strong>"simplifier cette slide"</strong> et il condense le texte en bullet points essentiels. Idéal pour transformer des slides trop chargées en messages clairs.' },
      { name: 'Workflow intégré',
        from: 'concept',
        detail: 'Le workflow recommandé : <strong>1)</strong> brainstorm et plan dans le chat Gemini, <strong>2)</strong> génération des slides dans Google Slides, <strong>3)</strong> affinage avec le panneau Gemini dans Slides. Tout reste dans l\'écosystème Google — pas de copier-coller entre outils.' }
    ],
    code: null,
    prereqs: ['01'],
    shared: []
  },
  {
    id: '07', section: 'branches', title: 'Extensions & Connexions', layer: 'mastery', done: true, jourJ: false,
    concepts: 'extensions Gemini, Google Drive, YouTube, Maps, Flights, Hotels, @mentions',
    insights: [
      'Les extensions sont <strong>l\'arme secrète de Gemini</strong>. Avec @Drive activé, vous pouvez dire "retrouve mon rapport Q4" et Gemini cherche dans votre vrai Google Drive. ChatGPT ne pouvait pas faire ça.',
      'L\'extension <strong>@YouTube</strong> permet de résumer n\'importe quelle vidéo publique en collant l\'URL. Parfait pour rattraper des conférences ou des tutoriels.',
      'Les extensions respectent vos <strong>permissions Google existantes</strong>. Gemini ne peut accéder qu\'à ce que vous pouvez déjà accéder — pas de nouveau risque de sécurité.'
    ],
    steps: [
      { instruction: 'Ouvrez les paramètres Gemini et trouvez la section "Extensions"', expected: 'La page Extensions affiche la liste des extensions disponibles avec un toggle pour chacune', copyable: 'https://gemini.google.com/extensions' },
      { instruction: 'Activez les extensions Google Workspace : Drive, Docs, Gmail', expected: 'Les extensions Workspace sont activées — Gemini peut maintenant accéder à vos documents et emails' },
      { instruction: 'Activez les autres extensions : YouTube, Google Maps, Google Flights, Google Hotels', expected: 'Toutes les extensions sont activées et prêtes à l\'emploi' },
      { instruction: 'Testez l\'extension Drive : demandez à Gemini de retrouver un document', expected: 'Gemini cherche dans votre Google Drive et trouve le document correspondant, avec un lien direct', copyable: '@Google Drive retrouve le dernier document que j\'ai modifié à propos du budget 2026' },
      { instruction: 'Testez l\'extension YouTube : résumez une vidéo en collant son URL', expected: 'Gemini analyse la vidéo et produit un résumé structuré avec les points clés', copyable: '@YouTube résume cette vidéo et liste les 5 points principaux : [collez l\'URL d\'une vidéo ici]' },
      { instruction: 'Testez l\'extension Gmail depuis le chat Gemini : recherchez un email spécifique', expected: 'Gemini trouve l\'email dans votre boîte de réception et vous en donne un résumé', copyable: '@Gmail retrouve le dernier email de [nom d\'un collègue] à propos du projet en cours' },
      { instruction: 'Combinez plusieurs extensions dans une seule requête', expected: 'Gemini utilise plusieurs sources d\'information pour répondre à votre question de manière complète', copyable: '@Google Drive retrouve notre roadmap produit et résume les 3 priorités principales pour ce trimestre' }
    ],
    apis: [
      { name: '@Google Drive',
        from: 'extension Gemini',
        detail: 'Permet à Gemini de <strong>chercher et lire vos documents Google Drive</strong> : Docs, Sheets, Slides, PDFs. Utilisez <code>@Google Drive</code> dans votre prompt pour activer la recherche. Gemini respecte vos permissions — il ne voit que ce que vous pouvez voir.' },
      { name: '@YouTube',
        from: 'extension Gemini',
        detail: 'Résume n\'importe quelle <strong>vidéo YouTube publique</strong> à partir de son URL. Gemini analyse le contenu audio/textuel et produit un résumé structuré. Idéal pour les conférences, tutoriels, et webinaires que vous n\'avez pas le temps de regarder.' },
      { name: '@Gmail',
        from: 'extension Gemini',
        detail: 'Permet de <strong>chercher et résumer des emails</strong> directement depuis le chat Gemini. Complémentaire au panneau Gemini dans Gmail — ici vous pouvez croiser des informations entre emails et autres sources.' },
      { name: 'Système de @mentions',
        from: 'interface Gemini',
        detail: 'Les extensions s\'activent avec le <strong>préfixe @</strong> suivi du nom du service : <code>@Google Drive</code>, <code>@YouTube</code>, <code>@Gmail</code>, <code>@Google Maps</code>. C\'est le mécanisme qui indique à Gemini où chercher l\'information.' }
    ],
    code: null,
    prereqs: ['01'],
    shared: [
      { concept: 'Extensions', targets: [] }
    ]
  },
  {
    id: '08', section: 'branches', title: 'Workflows Combinés', layer: 'mastery', done: true, jourJ: false,
    concepts: 'workflow multi-outils, Meet → Gmail, automatisation, écosystème Google, productivité',
    insights: [
      'La vraie puissance de Gemini n\'est pas une fonctionnalité unique — c\'est le fait que vos <strong>notes de réunion, emails, docs et slides vivent dans le même écosystème</strong>. Gemini les connecte sans copier-coller.',
      'Un workflow qui prenait <strong>15 minutes avec ChatGPT</strong> (copier les notes de réunion → coller dans ChatGPT → copier le résultat → coller dans Gmail) prend <strong>2 minutes avec Gemini</strong> car il a déjà le contexte.',
      'C\'est pourquoi la transition vaut le coup malgré la perte de certaines fonctionnalités ChatGPT (Code Interpreter, Actions). <strong>L\'intégration Workspace fait gagner plus de temps</strong> que ces fonctionnalités n\'en ajoutaient.'
    ],
    steps: [
      { instruction: 'Après une réunion Google Meet, ouvrez le résumé auto-généré dans Google Drive', expected: 'Le document de résumé s\'ouvre dans Google Docs avec les sujets abordés et les action items' },
      { instruction: 'Dans le chat Gemini, demandez de rédiger un email de suivi basé sur les notes de réunion', expected: 'Gemini génère un email structuré reprenant les décisions prises et les actions assignées', copyable: '@Google Drive ouvre les notes de la dernière réunion d\'équipe et rédige un email de suivi avec les actions à mener et les deadlines' },
      { instruction: 'Ouvrez Gmail et utilisez "Help me write" pour affiner l\'email de suivi', expected: 'L\'email généré par Gemini peut être affiné directement dans Gmail — ajustez le ton, la longueur, les destinataires' },
      { instruction: 'Relisez et envoyez l\'email de suivi aux participants', expected: 'L\'email est envoyé — tout le workflow s\'est fait dans l\'écosystème Google, sans copier-coller entre outils' },
      { instruction: 'Créez une liste de tâches à partir des action items de la réunion', expected: 'Les actions identifiées par Gemini sont transformées en tâches concrètes avec responsables et échéances', copyable: 'À partir des notes de réunion, crée une liste de tâches avec pour chaque tâche : responsable, échéance, et priorité (haute/moyenne/basse)' },
      { instruction: 'Testez un second workflow : résumé d\'un long thread Gmail → création de slides pour une présentation', expected: 'Gemini résume le thread, puis vous utilisez ce résumé pour générer des slides dans Google Slides — tout est connecté', copyable: '@Gmail résume les échanges des 2 dernières semaines sur le projet [nom] et propose un plan de 5 slides pour la réunion de suivi' },
      { instruction: 'Mesurez le temps gagné : comparez avec votre ancien workflow ChatGPT + copier-coller', expected: 'Vous constatez un gain de temps significatif sur les workflows multi-étapes grâce à l\'intégration native' }
    ],
    apis: [
      { name: 'Workflow Meet → Gmail',
        from: 'écosystème Workspace',
        detail: 'Le workflow le plus courant : <strong>réunion Meet → notes automatiques → email de suivi via Gmail</strong>. Avec ChatGPT, chaque étape nécessitait un copier-coller. Avec Gemini, les notes sont dans Drive et Gemini dans Gmail a accès au contexte — tout est fluide.' },
      { name: 'Workflow multi-sources',
        from: 'écosystème Workspace',
        detail: 'Gemini peut <strong>croiser des informations de plusieurs sources Google</strong> dans une seule requête : emails + documents Drive + notes de réunion. C\'est impossible avec ChatGPT qui ne voit que ce que vous collez dans le chat.' },
      { name: 'Automatisation de routines',
        from: 'concept',
        detail: 'Les workflows répétitifs (compte-rendu de réunion, email de suivi, mise à jour de présentation) deviennent des <strong>routines quasi automatiques</strong>. La clé : identifier vos 3-4 workflows les plus fréquents et les adapter à l\'écosystème Gemini + Workspace.' },
      { name: 'ROI de la migration',
        from: 'concept',
        detail: 'Le vrai calcul : <strong>temps gagné sur les workflows intégrés > temps perdu sur les fonctionnalités manquantes</strong> (Code Interpreter, Actions). Pour 90% des utilisateurs non-techniques, les intégrations Workspace compensent largement les limitations.' }
    ],
    code: null,
    prereqs: ['04', '05'],
    shared: []
  }
];

const MUTATIONS = [];

const LAYER_META = {
  transition: {
    label: 'Transition',
    className: 'layer--transition',
    glowColor: 'var(--transition-glow)',
    lineColor: 'var(--transition-line)',
    tagline: 'Retrouver ses repères — de ChatGPT à Gemini',
    buildsOn: 'Point de départ<br>équivalences, migration, mêmes usages',
    tooltip: '<strong>Transition</strong> couvre les bases : retrouver vos repères dans Gemini, migrer vos GPTs en Gems, et vérifier que vos usages quotidiens fonctionnent aussi bien qu\'avant.'
  },
  workspace: {
    label: 'Workspace',
    className: 'layer--workspace',
    glowColor: 'var(--workspace-glow)',
    lineColor: 'var(--workspace-line)',
    tagline: 'Gemini intégré à Gmail, Meet & Slides',
    buildsOn: 'Intégrations Workspace<br>ce que ChatGPT ne faisait pas',
    tooltip: '<strong>Workspace</strong> révèle le vrai avantage de Gemini : l\'intégration native avec Gmail, Meet et Slides. Pas de copier-coller, pas de plugin — Gemini est déjà dans vos outils.'
  },
  mastery: {
    label: 'Maîtrise',
    className: 'layer--mastery',
    glowColor: 'var(--mastery-glow)',
    lineColor: 'var(--mastery-line)',
    tagline: 'Extensions, connexions & workflows avancés',
    buildsOn: 'Aller plus loin<br>extensions Google, workflows combinés',
    tooltip: '<strong>Maîtrise</strong> pousse Gemini à son maximum : extensions (Drive, YouTube, Maps), workflows multi-outils, et automatisation de vos routines quotidiennes.'
  }
};
