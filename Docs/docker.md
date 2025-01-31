# Docker :
## Pourquoi ?
Docker permet d'empaqueter une application et toutes ses dépendances dans un conteneur isolé et portable. Il permet aux différents développeurs d'une application de travailler dans un même environnement.
## Comment ?
L'application sera empaquetée dans un conteneur comprenant quatre services qui seront chacuns servis sur un port différent par lesquels ils pourront communiquer.
Un fichier `docker-compose.yml` à la racine du projet contient le script à éxecuter pour lancer la création du conteneur. Ce fichier fait appel à deux fichier `Dockerfile` placés dans les dossiers `back-symfony` et `front-react-native` pour build les deux services.
## Services :
#### database :
- Image: Utilise MySQL 8.0.
- Nom du container: app_db
- Variables d’environnement: Définit l’utilisateur, le mot de passe et le nom de la base de données.
- Ports: Expose 3306 (port MySQL).
- Volumes: Utilise un volume db_data pour stocker les données MySQL et éviter de les perdre après l’arrêt du container.
- Healthcheck: Vérifie si MySQL est en bonne santé toutes les 10 secondes et attend jusqu'à 5 secondes avant d’échouer après 5 tentatives.
#### phpmyadmin :
- Image: Utilise phpmyadmin/phpmyadmin, une interface web pour gérer MySQL.
- Nom du container: app_phpmyadmin
- Variables d’environnement:
    - PMA_HOST: Indique que la base de données est hébergée sur database (le service MySQL).
    - PMA_PORT: Port MySQL.
    - PMA_ARBITRARY: Permet de se connecter à d’autres serveurs MySQL (optionnel).
- Ports: Associe le port 8080 de la machine hôte au port 80 du container.
- Dépendance: Attend que database soit lancé avant de démarrer.
#### backend :
- Build:
    - Utilise le dossier ./back-symfony pour construire l’image à partir d’un Dockerfile.
- Nom du container: app_backend
- Volumes:
    - Monte le code source Symfony (./back-symfony) dans /var/www/html du container.
    - Ignore le dossier /var/www/html/vendor pour éviter des conflits.
- Ports:
    - Associe 8090 (hôte) → 8000 (container) (serveur PHP de Symfony).
- Dépendances:
    - Attente que database soit prêt grâce au healthcheck.
Variables d’environnement:
    - DATABASE_URL est défini pour la connexion à la base de données.
- Commandes exécutées au démarrage:
    - Installation des dépendances Composer.
    - Mise à jour du schéma de la base de données.
    - Migration et chargement des fixtures.
    - Démarrage du serveur Symfony.
#### frontend :
- Build:
    Utilise le dossier ./front-react-native/basketbrain et un Dockerfile pour construire l’image.
- Nom du container: app_frontend
- Volumes:
    - Monte le code React Native dans /app.
    - Ignore node_modules pour éviter des conflits entre l’hôte et le container.
- Ports:
    - Expose plusieurs ports React Native pour Expo et le packager Metro.
- Variables d’environnement:
    - REACT_NATIVE_PACKAGER_HOSTNAME définit l’adresse IP du serveur Metro.
    - API_URL pointe vers le backend Symfony (http://backend:8000/api).
## Volumes :
- db_data: Stocke les données de la base MySQL pour éviter qu’elles ne soient perdues après l'arrêt du container.
## Lancement de conteneurisation de l'application :
- Prérequis :
	- Docker installé et en cours d'utilisation
	- Docker Compose installé
- Se placer à la racine du projet et dans la console, lancer la commande :
```bash
$ docker-compose up
```
Pour construire le conteneur et démarrer les services.
- Accès aux différentes parties de l'application :
	- Backend : http://localhost:8090
	- phpMyAdmin : http://localhost:8080
	- Frontend : http://localhost:8081
