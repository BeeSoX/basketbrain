# BASKETBRAIN

## Introduction :

Basketbrain est une application de paris sur les matchs NBA.

Architecture de l'application :
- Un backend sous forme d'API développé en PHP avec le framework Symfony
- Un frontend développé en JavaScript avec le framework React-native
- Le front consomme l'API [balldontlie](https://docs.balldontlie.io/#nba-api) pour afficher les données des matchs

## Base de donnée locale pour le développement :

On utilise une BDD MySQL via l'environnement MAMP pour MacOs et WAMP pour Windows.

Lancer votre serveur via WAMP ou MAMP.

Naviguer dans le dossier /back-symfony :

- on passe par l'orm doctrine qui est dans les dépendances, si ce n'est pas déjà fait, mettre à jour les dépendances :
```bash
composer install
```

- créer la base de données :
``` bash
symfony console doctrine:database:create
```
- jouer les migrations pour créer les tables :
```bash
symfony console doctrine:migrations:migrate
```

### Démarrer Back-end et modifier urls au besoin
ATTENTION, pensez à modifier dans le fichier .env à la racine de /back-symfony la ligne DATABASE_URL si jamais vous souhaitez essayer l'application en local ou réseau local.
De plus, le front-end appelant les routes du back-end, vous pouvez changer à votre guise l'adresse ip selon si vous voulez essayer en local ou réseau local, par exemple, changer ```192.168.1.41:8000``` en ```127.0.0.1:8000``` et inversement.
Retrouvez votre adresse IP grâce à un ```ipconfig``` (Windows) ou ```ifconfig``` (Linux | Mac) sur une invite de commande, si en réseau local ça ne fonctionne pas, lancer le serveur back-end avec cette commande ```php -S 0.0.0.0:8000 -t public```
pour le démarrer en local : ```symfony serve```, pour cela il faut être placé dans le back-symfony et penser à faire un ```composer install```

### Démarrer front -end
Se placer dans ```front-react-native/basketbrain``` faire ```npm install``` puis ```npm update``` et enfin ```npm start``` et voila !