Projet Game

Sommaire

    1. Structure et fonctionnement du projet
Présentation du projet

    2. Frontend : Base html / css avec utilisation de Tailwindcss

Structure html de base 3 pages : index, signup, login
Installation de tailwindcss (détailler)
Utilisation basique Tailwindcss

    3. Backend : Nodejs et express

Installation Nodejs et express
Mise en place de l’api
Configuration server > app > route > model > controller
Test avec Postman

    4. Frontend : ajout du JS pour appeler L’API et récupérer/envoyer données

    5. Création du jeu avec Kaboom JS



1) Structure et fonctionnement du projet

L’utilisateur arrive sur une page d’accueil qui redirige vers une page de connexion. 

La page de connexion demande un couple d’identifiant ( Pseudo/Mot de passe).
Les identifiants sont prédéfinis dans la partie Backend.
Un appel de l’API avec le verbe POST permet d’envoyer les identifiants rentrés en input et de vérifier si ils sont présent dans la base de donnée (Ici un fichier JSON).

Si les identifiant sont bien présent dans la BDD, l’utilisateur est redirigé vers une page permettant de sélectionner son personnage.
Les personnages sont aussi prédéfinis dans un fichier JSON dans le backend.
Au chargement de la page, un appel GET est utilisé pour récupérer les informations des personnages et les afficher dynamiquement grâce au DOM.

En cliquant sur un personnage on est redirigé vers la page du jeu ou celui ci se lance avec le dit personnage.
Le jeu est crée en utilisant Kaboom,js, une librairie Javascript permettant la création simple de jeux.


2) Frontend : HTML et CSS de base avec TailwindCSS

1) Structure HTML :

    • Page d’accueil : index.html
    • Page de connexion : login.html
    • Page de sélection de personnage : chara_select.html
    • Page du jeu : game.html



2) Partie CSS : TailwindCSS

Un framework « utility-first » permettant de définir des composants et design grâce à des classes prédéfinis.

Installation via NPM (On aura déjà installé Nodejs à ce stade):

Commande pour installer via npm
npm install -D tailwindcss

Commande pour créer le fichier ‘tailwind.config.js’
npx tailwindcss init

Le fichier tailwind.config.js permet de faire la configuration
Dans la partie content on va y mettre le chemin des fichiers à surveiller










On crée ensuite un fichier style.css dans un dossier css où on collera :
@tailwind base;
@tailwind components;
@tailwind utilities;
Ces directives vont représenter toutes les classes utilitaires , composant etc que l’on peut utiliser avec Tailwind
On exécute ensuite la commande suivante :
npx tailwindcss -i ./css/style.css -o ./dist/style.css –watch
Elle va scanner notre fichier style.css contenant les directives en input et ressortir un fichier CSS en output dans un dossier dist créer automatiquement, qu’on utilisera sur nos pages.

Ce fichier CSS contient un reset de base. Par la suite à chaque utilisation de Tailwind dans le code HTML, ce code sera modifier dynamiquement et le nouveau css sera ajouté à la suite du reset.
Le « --watch » permet de rester à l’écoute des changements et modifier le fichier CSS dynamiquement.












On se retrouve alors avec cette structure. 
« Node_modules » et les autres fichiers ont été généré automatiquement lors de l’installation de Tailwind via NPM. 
Le fichier gitignore permet de définir quelles fichiers on ne veut pas uploader sur GitHub. Ici on y ajoute « Node_modules » car volumineux.


3) Backend : Nodejs et Express

Ici on va créer notre API appelé par le Front pour afficher les personnages et vérifier l’utilisateur.

1) NodeJS:

Node est le runtime qui permet d'écrire toutes nos tâches côté serveur, en JavaScript. Node ajoute également des fonctionnalités que le JavaScript du navigateur standard ne possède pas, comme par exemple l'accès au système de fichiers local 

Installation  de NodeJS:














Direction le site officiel de Nodejs pour télécharger la dernière version.
Pour vérifier sa version de node on utilisera les commandes suivantes :

node -v
ou
node --version

Initier son projet:

Une fois Node installé et avec lui NPM, on va pouvoir initier notre projet.
Pour cela on exécute la commande :
npm init

On peut appuyer entrée pour passer toutes les question sauf à la question « définir un point d’entrée » on choisi server.js (que l’on va créer ensuite).

Cela va créer un fichier package,json dans lequel on retrouvera les détails des dépendances utilisé dans notre projet.















Ce point d’entrée server.js est le fichier JS à partir duquel l’exécution commence.

2) Express:

Express est un framework reposant sur Node, qui facilite la création et la gestion des serveurs Node 

Installation  d’Express:

npm install express

Une fois installé, on crée un fichier app.js qui contiendra notre application Express.

A ce stade on a nos 2 fichiers server.js et app.js.

On va voir comment va se structurer notre API par la suite.

3) Structure de notre application API:

    • server.js est le point d’entrée de l’application et s’occupera seulement de la logique serveur ( écoute de port, gestion d’erreur etc)

    • app.js est notre application Express

Par la suite on séparera la logique de notre application app elle-même en plusieurs morceaux (même si il est possible de tout mettre dans un même fichier.)

    • Un dossier Route qui va contenir des routes qu’on aura défini grâce à la classe express.Router. On peut considérer cela comme une mini application qui gérera exclusivement les routes.
Le Routage fait référence à la définition de points finaux d’application (URI) et à la façon dont ils répondent aux demandes client.

Exemple :

 app.get('/exemple', function afficher (req, res) {
  res.send('Hello World!');
});
Exécute la fonction afficher si il y a une requête GET à l’adresse ‘ /exemple’


    • Un dossier Controller qui va contenir les middlewares  qu’on aura aussi défini et qui seront liés à une route.
Les middlewares sont des fonctions qui peuvent accéder à la requête HTTP (l’objet Request (req)) et permet d’établir les réponses à ces requêtes (l’objet Response (res)). 

Ainsi pour reprendre l’exemple précédent on aura :

Exemple :

 app.get('/exemple', fichierController.afficher);

La fonction « afficher » (que l’on peut maintenant appeller middleware vu que c’est le bon terme) est alors défini dans un fichier séparé fichierController.
Fichier que l’on va importer pour pouvoir l’utiliser.

Cela permet d’avoir un code mieux organisé et plus lisible surtout quand on aura des middlewares plus long et complexe.


    • Un dossier Model qui va contenir tout ce qui est relatif aux données qu’on utilisera dans notre API, cela pourra être une connection à une BDD ou un fichier JSON par exemple. 

On aura donc en résumé une structure comme tel :







