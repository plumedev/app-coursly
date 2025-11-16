import { db } from '@/config/firebase'
import type { ICreateShoppingItem, IShoppingItem, IUpdateShoppingItem } from '@/interfaces/IShoppingItem'
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
  setDoc,
  query,
  where
} from 'firebase/firestore'

const COLLECTION_NAME = 'shoppingItems'

/**
/**
/**
 * Convertit un document Firestore en IShoppingItem
 */
const convertFirestoreItem = (doc: import('firebase/firestore').DocumentSnapshot): IShoppingItem => {
  const data = doc.data() as {
    listId: string
    name: string
    quantity: number
    unit?: string
    checked?: boolean
    createdAt?: { toDate: () => Date }
    updatedAt?: { toDate: () => Date }
  }
  return {
    id: doc.id,
    listId: data.listId,
    name: data.name,
    quantity: data.quantity,
    unit: data.unit || undefined,
    checked: data.checked || false,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date()
  }
}

/**
 * Crée un nouvel item dans la liste de courses
 */
export const createShoppingItem = async (item: ICreateShoppingItem): Promise<IShoppingItem> => {
  const now = Timestamp.now()
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    listId: item.listId,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit || null,
    createdAt: now,
    updatedAt: now
  })

  // Récupérer le document créé pour le retourner
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists()) {
    throw new Error("Erreur lors de la création de l'item")
  }

  return convertFirestoreItem(docSnapshot)
}

/**
 * Récupère tous les items de la liste de courses pour une liste donnée
 */
export const getShoppingItems = async (listId: string): Promise<IShoppingItem[]> => {
  const q = query(collection(db, COLLECTION_NAME), where('listId', '==', listId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => convertFirestoreItem(doc))
}

/**
 * Met à jour un item existant
 */
export const updateShoppingItem = async (item: IUpdateShoppingItem): Promise<IShoppingItem> => {
  const itemRef = doc(db, COLLECTION_NAME, item.id)
  const updateData: Record<string, unknown> = {
    updatedAt: Timestamp.now()
  }

  if (item.name !== undefined) updateData.name = item.name
  if (item.quantity !== undefined) updateData.quantity = item.quantity
  if (item.unit !== undefined) updateData.unit = item.unit || null
  if (item.checked !== undefined) updateData.checked = item.checked

  await updateDoc(itemRef, updateData)

  // Récupérer le document mis à jour
  const docSnapshot = await getDoc(itemRef)

  if (!docSnapshot.exists()) {
    throw new Error("Erreur lors de la mise à jour de l'item")
  }

  return convertFirestoreItem(docSnapshot)
}

/**
 * Supprime un item de la liste de courses
 */
export const deleteShoppingItem = async (id: string): Promise<void> => {
  const itemRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(itemRef)
}

/**
 * Écoute les changements en temps réel sur la collection shoppingItems pour une liste donnée
 */
export const subscribeToShoppingItems = (listId: string, callback: (items: IShoppingItem[]) => void): (() => void) => {
  const q = query(collection(db, COLLECTION_NAME), where('listId', '==', listId))

  return onSnapshot(
    q,
    (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => convertFirestoreItem(doc))
      callback(items)
    },
    (error) => {
      console.error("Erreur lors de l'écoute des items:", error)
    }
  )
}

/**
 * Marque un item comme récupéré ou non récupéré
 */
export const toggleItemChecked = async (id: string, checked: boolean): Promise<IShoppingItem> => {
  return updateShoppingItem({ id, checked })
}

// Collection pour l'état du mode courses (par liste)
const SHOPPING_MODE_COLLECTION = 'shoppingMode'

/**
 * Active ou désactive le mode courses pour une liste donnée
 */
export const setShoppingMode = async (listId: string, isActive: boolean): Promise<void> => {
  const modeRef = doc(db, SHOPPING_MODE_COLLECTION, listId)
  await setDoc(modeRef, { isActive, updatedAt: Timestamp.now() }, { merge: true })
}

/**
 * Récupère l'état actuel du mode courses pour une liste donnée
 */
export const getShoppingMode = async (listId: string): Promise<boolean> => {
  const modeRef = doc(db, SHOPPING_MODE_COLLECTION, listId)
  const modeSnapshot = await getDoc(modeRef)

  if (!modeSnapshot.exists()) {
    return false
  }

  return modeSnapshot.data().isActive || false
}

/**
 * Écoute les changements en temps réel sur l'état du mode courses pour une liste donnée
 */
export const subscribeToShoppingMode = (listId: string, callback: (isActive: boolean) => void): (() => void) => {
  const modeRef = doc(db, SHOPPING_MODE_COLLECTION, listId)

  return onSnapshot(
    modeRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data().isActive || false)
      } else {
        callback(false)
      }
    },
    (error) => {
      console.error("Erreur lors de l'écoute du mode courses:", error)
      callback(false)
    }
  )
}
