# Test de la librairie modele social

## Installer les packages
```
npm install
```
 
## Lancer le projet
```
npm run start
```

Pour 42000 de chiffre d'affaires et 26000 de depenses j'obtiens 4991 de cotisations sociales avec la librairie modele-social alors que sur le simulateur en ligne de l'URSSAF j'obtiens 4708 

## Docker

# Construire l'image
docker build -t mosily-urssaf .

# Exécuter le conteneur
docker run -p 3001:3001 --name mosily-urssaf-container mosily-urssaf

N'oubliez pas que si vous avez des variables d'environnement (comme indiqué par l'utilisation de dotenv dans votre code), vous devrez les passer au conteneur lors de l'exécution, par exemple :

docker run -p 3001:3001 --name mosily-urssaf-container --env-file .env mosily-urssaf
