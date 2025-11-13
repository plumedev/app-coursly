# Application Liste de Courses - Guide de Démarrage

## ✅ Ce qui a été créé

### 1. Configuration Firebase

- **Fichier** : `src/config/firebase.ts`
- Configuration Firebase avec vérification des variables d'environnement
- Initialisation de Firestore

### 2. Interfaces TypeScript

- **Fichier** : `src/interfaces/IShoppingItem.ts`
- `IShoppingItem` : Structure complète d'un produit
- `ICreateShoppingItem` : Pour créer un nouveau produit
- `IUpdateShoppingItem` : Pour mettre à jour un produit

### 3. Service Firebase

- **Fichier** : `src/api/shopping/shoppingService.ts`
- Fonctions CRUD complètes :
  - `createShoppingItem()` : Créer un produit
  - `getShoppingItems()` : Récupérer tous les produits
  - `updateShoppingItem()` : Mettre à jour un produit
  - `deleteShoppingItem()` : Supprimer un produit

### 4. Composables CRUD

- **Dossier** : `src/composables/shopping/`
- `useCreateShoppingItem.ts` : Composable pour créer
- `useReadShoppingItems.ts` : Composable pour lire (avec chargement automatique)
- `useUpdateShoppingItem.ts` : Composable pour mettre à jour
- `useDeleteShoppingItem.ts` : Composable pour supprimer

Tous les composables utilisent `useRequest` pour la gestion d'état (loading, error, success) et `useToast` pour les notifications.

### 5. Vue principale

- **Fichier** : `src/views/shopping-list-view/ShoppingListView.vue`
- Formulaire d'ajout de produits
- Liste des produits avec :
  - Affichage du nom, quantité et unité
  - Édition inline via dialog
  - Suppression individuelle
  - Sélection multiple pour suppression en masse
  - Bouton d'actualisation

### 6. Router

- Route `/shopping-list` ajoutée
- Route par défaut (`/`) redirige vers la liste de courses

## 📋 Structure de la Base de Données Firebase

### Collection : `shoppingItems`

Chaque document contient :

```typescript
{
  id: string              // Auto-généré par Firestore
  name: string            // Nom du produit
  quantity: number         // Quantité
  unit?: string           // Unité optionnelle (kg, g, L, ml, unité, etc.)
  createdAt: Timestamp    // Date de création
  updatedAt: Timestamp    // Date de modification
}
```

## 🚀 Prochaines étapes

### 1. Configurer Firebase

1. Créez un projet sur [Firebase Console](https://console.firebase.google.com)
2. Activez Firestore Database
3. Configurez les règles de sécurité (voir `FIREBASE_SETUP.md`)
4. Récupérez vos clés de configuration

### 2. Créer le fichier `.env`

Créez un fichier `.env` à la racine du projet :

```env
VITE_FIREBASE_API_KEY=votre-api-key
VITE_FIREBASE_AUTH_DOMAIN=votre-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-project-id
VITE_FIREBASE_STORAGE_BUCKET=votre-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=votre-messaging-sender-id
VITE_FIREBASE_APP_ID=votre-app-id
```

### 3. Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:8080` et redirigera automatiquement vers `/shopping-list`.

## 📝 Fonctionnalités

✅ Ajout de produits avec nom, quantité et unité optionnelle  
✅ Modification de produits existants  
✅ Suppression individuelle ou en masse  
✅ Affichage de la liste avec formatage des quantités  
✅ Gestion des erreurs avec notifications toast  
✅ États de chargement (loading)  
✅ Validation des formulaires

## 🎨 Interface

L'interface utilise Vuetify 3 avec :

- Design moderne et responsive
- Formulaire avec validation
- Liste interactive
- Dialog d'édition
- Notifications toast pour le feedback utilisateur

## 📚 Documentation

- **Configuration Firebase** : Voir `FIREBASE_SETUP.md` pour les détails complets
- **Architecture** : Le projet suit la structure existante avec séparation claire des responsabilités
