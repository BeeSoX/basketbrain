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