# Vue3 + TypeScript Starter Kit

Un starter moderne et complet pour débuter rapidement vos projets Vue3 avec TypeScript.

## 🚀 Fonctionnalités

- **Vue 3** avec Composition API et `<script setup>`
- **TypeScript** pour un développement typé et robuste
- **Vuetify 3** pour une interface utilisateur moderne
- **Vue Router** pour la navigation
- **Pinia** pour la gestion d'état
- **Vue I18n** pour l'internationalisation
- **Vite** pour un développement rapide
- **ESLint + Prettier** pour la qualité du code

## 📁 Structure du projet

```
src/
├── api/                    # Services API
│   └── example/           # API d'exemple
├── assets/                # Ressources statiques
├── composables/           # Logique métier réutilisable
├── helpers/               # Fonctions utilitaires
├── plugins/               # Configuration des plugins
├── providers/             # Providers pour injection de dépendances
├── router/                # Configuration du routeur
├── stores/                # Stores Pinia
└── views/                 # Vues/Pages de l'application
```

## 🚀 Démarrage rapide

### Prérequis

- Node.js v20.18.0 ou supérieur
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd vue-starter-kit

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

### Commandes disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint

# Formatage du code
npm run format
```

## 🔧 Configuration

### Vuetify

La configuration Vuetify se trouve dans `src/plugins/vuetify.ts`. Vous pouvez personnaliser le thème, les icônes et les composants.

### Vue I18n

Les traductions sont dans `src/assets/locales/`. Le starter est configuré pour le français par défaut.

### API

Un exemple d'API est fourni dans `src/api/example/`. Consultez la [documentation API](doc/architecture-decision-records/code-structure/api-example.md) pour plus de détails.

## 📱 Exemple d'utilisation

Le starter inclut une page d'accueil de démonstration qui montre:

- Un appel API avec gestion d'état
- L'utilisation des composables
- L'intégration Vuetify
- La gestion des erreurs
- Les notifications toast

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Vue.js team pour Vue 3
- Vuetify team pour les composants UI
- La communauté open source pour tous les outils utilisés