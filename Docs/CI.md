# Pipeline CI :
## Pourquoi ?
La CI est un workflow qui vérifie automatiquement que le code est propre et que rien n'est cassé à chaque fois que du code est poussé sur le répertoire Git distant. Cela permet d'automatiser les tests, d'éviter de déployer des bugs en production et que toute l'équipe avance plus sereinement.
## Comment ?
Mise en place d'une pipeline CI via GitHub Actions.  
Pour la mise en place de cette pipeline, on créé un fichier à la racine du projet : `./.github/worflows/pipeline.yml`

```yml
name: Symfony and React Native

on:
  push:
    branches: [ "**" ]
  pull_request:
    branches: [ "main" ]

permissions:
  contents: read

jobs:

  react-native-lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install ESLint
      run: npm install eslint
      working-directory: front-react-native/basketbrain
    - name: Run ESLint
      run: npx eslint
      working-directory: front-react-native/basketbrain

  symfony-test:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: password
          MYSQL_DATABASE: symfony_test
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    steps:
      - uses: actions/checkout@v4
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: pdo_mysql
      
      - name: Install dependencies
        run: composer install
        working-directory: back-symfony
        
      - name: Install Debug Bundle
        run: composer require symfony/debug-bundle --dev
        working-directory: back-symfony
        
      - name: Setup Database
        run: |
          php bin/console doctrine:database:create --env=test --if-not-exists
          php bin/console doctrine:schema:update --force --env=test
        working-directory: back-symfony
        env:
          DATABASE_URL: mysql://root:password@127.0.0.1:3306/symfony_test
      
      - name: Run tests
        run: php bin/phpunit
        working-directory: back-symfony
        env:
          DATABASE_URL: mysql://root:password@127.0.0.1:3306/symfony_test
```

Cette pipeline est exécutée lorsque du code est poussé sur le répertoire GitHub et lors d'une demande de fusion de branche sur `main`.  
On donne uniquement les droit de lecture du dépôt à ce workflow. 
Deux jobs seront joués dans cette pipeline :
#### 1.  react-native-lint :
Ce job permet de vérifier la qualité de code du frontend via l'outil ESLint.
- S'exécute sur le dernier environnement Ubuntu.
- Étapes :
    - Récupère le dépôt.
    - Configure Node.js version 18.
    - Installe ESLint dans le répertoire de travail spécifié.
    - Exécute ESLint dans le répertoire de travail spécifié.
#### 2.  symfony-test :
Ce job permet de jouer les tests PHPUnit mis en place dans le backend.
- S'exécute sur le dernier environnement Ubuntu.
- Services :
    - Configure un service MySQL version 8.0, avec des variables d'environnement spécifiées et des vérifications de santé.
- Étapes :
    - Récupère le dépôt.
    - Configure PHP version 8.3 avec l'extension pdo_mysql.
    - Installe les dépendances Composer dans le répertoire de travail spécifié.
    - Installe le Symfony Debug Bundle comme dépendance de développement.
    - Configure la base de données en la créant si elle n'existe pas et met à jour le schéma.
    - Exécute les tests PHPUnit avec la variable d'environnement de base de données spécifiée.
## Conclusion :
La pipeline CI fonctionne et mériterait quelques améliorations :
- Ajout de tests plus pertinents
- Charger des fixtures pour tester la persistance des données en BDD