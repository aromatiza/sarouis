WORLD FOOD DAY — QUIZ
=====================

FICHIERS
- index.html            la page
- style.css             le design
- script.js             les 10 questions + la logique + l'envoi vers Supabase
- supabase-schema.sql   la table SQL à créer dans Supabase

PARCOURS DU VISITEUR
1. Accueil  ->  2. Inscription (prénom, nom, e-mail, téléphone)  ->  3. Les 10 questions
->  4. Résultat + correction  (le tout est enregistré dans Supabase)

1) CRÉER LA TABLE
- Supabase > SQL Editor > New query
- Collez le contenu de supabase-schema.sql, puis Run.
- (Si vous aviez déjà créé l'ancienne table, dé-commentez la ligne "drop table" tout en haut.)

2) CONNECTER LE SITE
- Supabase > Project Settings > API : copiez "Project URL" et la clé "anon / public".
- Dans script.js, remplacez SUPABASE_URL et SUPABASE_ANON_KEY.
- N'utilisez JAMAIS la clé service_role dans le site.

3) TESTER
- Ouvrez le dossier dans VS Code, lancez index.html avec Live Server.
- Faites un test complet, puis vérifiez dans Supabase > Table Editor > quiz_results.

4) METTRE EN LIGNE
- Netlify, Vercel, GitHub Pages ou Cloudflare Pages : glissez le dossier, c'est un site statique.

DONNÉES ENREGISTRÉES (table quiz_results)
first_name, last_name, email, phone, score, percentage, duration_seconds,
answers (détail des 10 réponses en JSON), created_at.
La lecture publique est désactivée : seul vous (admin Supabase) voyez les données.

LIMITE À CONNAÎTRE
Le score est calculé dans le navigateur : une personne technique pourrait le modifier avant l'envoi.
Pour un concours avec un prix, il faut calculer le score côté serveur (Edge Function).
Ces données sont personnelles : gardez-les privées et utilisez-les seulement pour ce quiz.
