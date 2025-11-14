export interface IShoppingItem {
  id: string
  name: string
  quantity: number
  unit?: string // Optionnel : "kg", "g", "L", "ml", "unité", etc.
  checked?: boolean // Indique si le produit a été récupéré en magasin
  createdAt: Date
  updatedAt: Date
}

// Interface pour créer un nouvel item (sans id et dates)
export interface ICreateShoppingItem {
  name: string
  quantity: number
  unit?: string
}

// Interface pour mettre à jour un item (tous les champs optionnels sauf id)
export interface IUpdateShoppingItem {
  id: string
  name?: string
  quantity?: number
  unit?: string
  checked?: boolean
}
