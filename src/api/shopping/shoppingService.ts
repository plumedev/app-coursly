import { db } from '@/config/firebase'
import type { ICreateShoppingItem, IShoppingItem, IUpdateShoppingItem } from '@/interfaces/IShoppingItem'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, Timestamp } from 'firebase/firestore'

const COLLECTION_NAME = 'shoppingItems'

/**
 * Convertit un document Firestore en IShoppingItem
 */
const convertFirestoreItem = (doc: any): IShoppingItem => {
  const data = doc.data()
  return {
    id: doc.id,
    name: data.name,
    quantity: data.quantity,
    unit: data.unit || undefined,
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
 * Récupère tous les items de la liste de courses
 */
export const getShoppingItems = async (): Promise<IShoppingItem[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
  return querySnapshot.docs.map((doc) => convertFirestoreItem(doc))
}

/**
 * Met à jour un item existant
 */
export const updateShoppingItem = async (item: IUpdateShoppingItem): Promise<IShoppingItem> => {
  const itemRef = doc(db, COLLECTION_NAME, item.id)
  const updateData: any = {
    updatedAt: Timestamp.now()
  }

  if (item.name !== undefined) updateData.name = item.name
  if (item.quantity !== undefined) updateData.quantity = item.quantity
  if (item.unit !== undefined) updateData.unit = item.unit || null

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
