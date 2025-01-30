FROM node:18

WORKDIR /app

# Installation des dépendances globales
RUN npm install -g expo-cli

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]