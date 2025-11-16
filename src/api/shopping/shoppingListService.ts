import { db } from '@/config/firebase'
import type { ICreateShoppingList, IShoppingList, IUpdateShoppingList } from '@/interfaces/IShoppingList'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'

const COLLECTION_NAME = 'shoppingLists'

/**
 * Convertit un document Firestore en IShoppingList
 */
const convertFirestoreList = (doc: import('firebase/firestore').DocumentSnapshot): IShoppingList => {
  const data = doc.data() as {
    name: string
    createdAt?: { toDate: () => Date }
    updatedAt?: { toDate: () => Date }
  }
  return {
    id: doc.id,
    name: data.name,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date()
  }
}

/**
 * Crée une nouvelle liste de courses
 */
export const createShoppingList = async (list: ICreateShoppingList): Promise<IShoppingList> => {
  const now = Timestamp.now()
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    name: list.name.trim(),
    createdAt: now,
    updatedAt: now
  })

  // Récupérer le document créé pour le retourner
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists()) {
    throw new Error('Erreur lors de la création de la liste')
  }

  return convertFirestoreList(docSnapshot)
}

/**
 * Récupère toutes les listes de courses
 */
export const getShoppingLists = async (): Promise<IShoppingList[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('updatedAt', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => convertFirestoreList(doc))
}

/**
 * Récupère une liste de courses par son ID
 */
export const getShoppingListById = async (id: string): Promise<IShoppingList | null> => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists()) {
    return null
  }

  return convertFirestoreList(docSnapshot)
}

/**
 * Met à jour une liste existante
 */
export const updateShoppingList = async (list: IUpdateShoppingList): Promise<IShoppingList> => {
  const listRef = doc(db, COLLECTION_NAME, list.id)
  const updateData: Record<string, unknown> = {
    updatedAt: Timestamp.now()
  }

  if (list.name !== undefined) updateData.name = list.name.trim()

  await updateDoc(listRef, updateData)

  // Récupérer le document mis à jour
  const docSnapshot = await getDoc(listRef)

  if (!docSnapshot.exists()) {
    throw new Error('Erreur lors de la mise à jour de la liste')
  }

  return convertFirestoreList(docSnapshot)
}

/**
 * Supprime une liste de courses
 */
export const deleteShoppingList = async (id: string): Promise<void> => {
  const listRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(listRef)
}

/**
 * Écoute les changements en temps réel sur la collection shoppingLists
 */
export const subscribeToShoppingLists = (callback: (lists: IShoppingList[]) => void): (() => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('updatedAt', 'desc'))

  return onSnapshot(
    q,
    (querySnapshot) => {
      const lists = querySnapshot.docs.map((doc) => convertFirestoreList(doc))
      callback(lists)
    },
    (error) => {
      console.error("Erreur lors de l'écoute des listes:", error)
    }
  )
}
