# Scénarios de test :
### Utilisateur : 
- route ```/api/user/register```, je reçois des données json sous ce format ```
{email: test@testcom
            password: Mot2Pass_,
            firstname: prenom,
            lastname: nom,
            birthdate: 2025-31-01```, cela créer un utilisateur, le persiste en DB et retourne un statut 201 avec confirmation
- route ```api/user/login```, je reçois des données json sous ce format ```{email: test@test.com,
                    password: Mot2Pass_,}``` cela vérifie si la personne essayant de se connecter existe en DB, ainsi que la validité du mot de passe, retourne statut 200 avec les informations de l'utilisateur
- route ```api/user/add/credit```, je reçois des données json sous ce format ```{email: test@test.com,
  credit: 78,}```, ajoute la somme envoyée au total que possède déjà l'utilisateur, renvoie un code 200 avec les informations de l'utilisateur
- route ```api/user/remove/credit```, je reçois des données json sous ce format ```{email: test@test.com,
  credit: 78,}```, enlève la somme envoyée au total que possède déjà l'utilisateur, renvoie un code 200 avec les informations de l'utilisateur

### Paris : 
- route ```/api/bet/all```, récupère tout les paris de la DB et renvoie les bets avec un statut 200 sous format json
- route ```/api/user/{id}```, reçois un id sous format json, récupère l'utilisateur ainsi que ses paris, renvoie les paris sous format json
- route ```/api/bet/new```, reçois des données sous format json ```{email: test@test.com,
  betDate: '2025-01-31',
  betGame: 15796,
  betWin: Warriors,
  betAmount: 100000,
  betOdd: 1.73}```, créer un paris et met à jour les crédits de l'utilisateur selon le résultat du match, renvoie les données de l'utilisateur