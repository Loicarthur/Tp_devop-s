# Utilisation d'une image de base Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY package.json package-lock.json /app/

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . /app/

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3002

# Commande pour démarrer l'application
CMD ["node", "app.js"]
