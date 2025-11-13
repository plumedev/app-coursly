import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Vérification que les variables d'environnement sont définies
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
]

const missingVars = requiredEnvVars.filter((varName) => !import.meta.env[varName])

if (missingVars.length > 0) {
  console.warn(`⚠️ Variables d'environnement Firebase manquantes: ${missingVars.join(', ')}`)
  console.warn('⚠️ Veuillez créer un fichier .env avec les valeurs de .env.example')
}

// Initialisation de Firebase
const app = initializeApp(firebaseConfig)

// Initialisation de Firestore
export const db = getFirestore(app)

export default app
