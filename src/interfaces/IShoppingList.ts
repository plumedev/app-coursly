export interface IShoppingList {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

// Interface pour créer une nouvelle liste (sans id et dates)
export interface ICreateShoppingList {
  name: string
}

// Interface pour mettre à jour une liste (tous les champs optionnels sauf id)
export interface IUpdateShoppingList {
  id: string
  name?: string
}
