export interface IShoppingItem {
  id: string
  listId: string // ID de la liste de courses à laquelle appartient cet item
  name: string
  quantity: number
  unit?: string // Optionnel : "kg", "g", "L", "ml", "unité", etc.
  comment?: string // Commentaire optionnel sur l'item
  checked?: boolean // Indique si le produit a été récupéré en magasin
  createdAt: Date
  updatedAt: Date
}

// Interface pour créer un nouvel item (sans id et dates)
export interface ICreateShoppingItem {
  listId: string // ID de la liste de courses à laquelle appartient cet item
  name: string
  quantity: number
  unit?: string
  comment?: string // Commentaire optionnel sur l'item
}

// Interface pour mettre à jour un item (tous les champs optionnels sauf id)
export interface IUpdateShoppingItem {
  id: string
  name?: string
  quantity?: number
  unit?: string
  comment?: string // Commentaire optionnel sur l'item
  checked?: boolean
}
