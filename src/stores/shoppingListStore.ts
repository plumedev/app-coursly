import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IShoppingList } from '@/interfaces/IShoppingList'

export const useShoppingListStore = defineStore('shoppingList', () => {
  // Fonction pour obtenir la liste active initiale depuis localStorage
  const getInitialActiveListId = (): string | null => {
    if (typeof window === 'undefined') return null
    const saved = localStorage.getItem('activeShoppingListId')
    return saved || null
  }

  const activeListId = ref<string | null>(getInitialActiveListId())
  const lists = ref<IShoppingList[]>([])

  // Liste active calculée
  const activeList = computed(() => {
    if (!activeListId.value) return null
    return lists.value.find((list) => list.id === activeListId.value) || null
  })

  // Fonction pour définir la liste active
  const setActiveListId = (listId: string | null) => {
    activeListId.value = listId
    if (listId) {
      localStorage.setItem('activeShoppingListId', listId)
    } else {
      localStorage.removeItem('activeShoppingListId')
    }
  }

  // Fonction pour mettre à jour les listes
  const setLists = (newLists: IShoppingList[]) => {
    lists.value = newLists
    // Si la liste active n'existe plus, la réinitialiser
    if (activeListId.value && !lists.value.find((list) => list.id === activeListId.value)) {
      if (lists.value.length > 0) {
        setActiveListId(lists.value[0].id)
      } else {
        setActiveListId(null)
      }
    }
    // Si aucune liste active et qu'il y a des listes, sélectionner la première
    if (!activeListId.value && lists.value.length > 0) {
      setActiveListId(lists.value[0].id)
    }
  }

  return {
    activeListId,
    activeList,
    lists,
    setActiveListId,
    setLists
  }
})
