# Guide pour publier le projet sur GitHub

## 📋 Étapes à suivre

### 1. Créer un fichier `.env.example` (optionnel mais recommandé)

Créez un fichier `.env.example` à la racine du projet avec le contenu suivant :

```env
# Configuration Firebase
# Récupérez ces valeurs depuis la console Firebase (https://console.firebase.google.com)
# Allez dans Project Settings > General > Your apps > Web app

VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

⚠️ **Important** : Ne commitez JAMAIS votre fichier `.env` réel (il est déjà dans `.gitignore`).

### 2. Préparer votre projet Git

```bash
# Vérifier l'état actuel
git status

# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Créer le premier commit
git commit -m "Initial commit: Application de liste de courses avec Firebase"
```

### 3. Créer un nouveau repository sur GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite, puis **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `app-course` (ou le nom que vous préférez)
   - **Description** : "Application simple de gestion de liste de courses avec Firebase"
   - **Visibilité** : Public ou Private (selon votre préférence)
   - ⚠️ **NE COCHEZ PAS** "Initialize this repository with a README" (vous avez déjà un README)
4. Cliquez sur **"Create repository"**

### 4. Connecter votre projet local à GitHub

GitHub vous donnera des commandes à exécuter. Voici les commandes standard :

```bash
# Ajouter le remote GitHub (remplacez USERNAME et REPO_NAME par vos valeurs)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Envoyer votre code sur GitHub
git push -u origin main
```

**Exemple concret** :
```bash
git remote add origin https://github.com/votre-username/app-course.git
git branch -M main
git push -u origin main
```

### 5. Vérification

Après le push, rafraîchissez la page GitHub. Vous devriez voir tous vos fichiers.

## 🔐 Sécurité - Variables d'environnement

⚠️ **IMPORTANT** : Vérifiez que votre fichier `.env` n'est PAS dans le repository :

```bash
# Vérifier que .env est bien ignoré
git status
```

Si `.env` apparaît, il ne devrait pas être là. Le `.gitignore` devrait l'exclure automatiquement.

## 📝 Commandes Git utiles

```bash
# Voir l'état des fichiers
git status

# Ajouter des fichiers spécifiques
git add fichier1.ts fichier2.vue

# Voir l'historique des commits
git log

# Voir les remotes configurés
git remote -v

# Mettre à jour depuis GitHub
git pull origin main

# Envoyer des modifications
git add .
git commit -m "Description des modifications"
git push origin main
```

## 🚀 Prochaines étapes

Une fois sur GitHub, vous pouvez :
- Ajouter une description au repository
- Ajouter des topics/tags
- Configurer GitHub Pages (si besoin)
- Ajouter un fichier LICENSE
- Inviter des collaborateurs

## 💡 Astuce

Si vous utilisez SSH au lieu de HTTPS, utilisez cette URL pour le remote :
```bash
git remote add origin git@github.com:USERNAME/REPO_NAME.git
```

