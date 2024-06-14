# Utiliser une image Node.js officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Installation des dépendances de développement (mocha et chai)
RUN npm install --save-dev mocha chai

# Copier le reste de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application écoute (port 3000 dans cet exemple)
EXPOSE 3002

# Définir la commande pour démarrer l'application
CMD ["node", "app.js"]
