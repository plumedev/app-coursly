# Configuration Firebase - Liste de Courses

## Structure de la Base de Données

### Collection : `shoppingItems`

Chaque document dans cette collection représente un produit de la liste de courses.

#### Structure d'un document :

```typescript
{
  id: string                    // ID auto-généré par Firestore
  name: string                  // Nom du produit (ex: "Lait", "Pommes")
  quantity: number              // Quantité (ex: 2, 1.5)
  unit?: string                 // Unité optionnelle (ex: "kg", "g", "L", "ml", "unité")
  createdAt: Timestamp          // Date de création
  updatedAt: Timestamp          // Date de dernière modification
}
```

#### Exemples de documents :

```json
{
  "name": "Lait",
  "quantity": 2,
  "unit": "L",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

```json
{
  "name": "Pommes",
  "quantity": 1.5,
  "unit": "kg",
  "createdAt": "2024-01-15T10:31:00Z",
  "updatedAt": "2024-01-15T10:31:00Z"
}
```

```json
{
  "name": "Pain",
  "quantity": 2,
  "unit": "unité",
  "createdAt": "2024-01-15T10:32:00Z",
  "updatedAt": "2024-01-15T10:32:00Z"
}
```

## Configuration Firebase

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Cliquez sur "Ajouter un projet"
3. Suivez les étapes pour créer votre projet

### 2. Activer Firestore Database

1. Dans votre projet Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez le mode "Production" ou "Test" (pour commencer, le mode test est plus simple)
4. Sélectionnez une région (ex: `europe-west` pour l'Europe)
5. Cliquez sur "Activer"

### 3. Configurer les règles de sécurité

Pour une application simple sans authentification, vous pouvez utiliser ces règles en mode test :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Attention** : Ces règles permettent à n'importe qui de lire et écrire dans votre base de données. Pour une application en production, vous devriez ajouter une authentification ou des règles plus restrictives.

### 4. Récupérer les clés de configuration

1. Dans Firebase Console, allez dans "Project Settings" (⚙️ en haut à gauche)
2. Allez dans l'onglet "General"
3. Descendez jusqu'à "Your apps" et cliquez sur l'icône Web (</>)
4. Si vous n'avez pas encore d'app web, créez-en une
5. Copiez les valeurs de configuration

### 5. Créer le fichier `.env`

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Remplacez les valeurs par celles récupérées dans Firebase Console.

### 6. Redémarrer le serveur de développement

Après avoir créé le fichier `.env`, redémarrez votre serveur de développement :

```bash
npm run dev
```

## Utilisation

Une fois configuré, l'application est prête à être utilisée. Vous pouvez :

- Ajouter des produits à la liste
- Modifier des produits existants
- Supprimer des produits (un par un ou plusieurs en même temps)
- Actualiser la liste pour voir les modifications en temps réel

Toutes les opérations sont synchronisées avec Firebase Firestore.
