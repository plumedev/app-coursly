import { ref, onMounted, onUnmounted } from 'vue'
import { subscribeToShoppingLists } from '@/api/shopping/shoppingListService'
import type { IShoppingList } from '@/interfaces/IShoppingList'

export function useSubscribeToShoppingLists() {
  const lists = ref<IShoppingList[]>([])
  const isLoading = ref(true)
  const isError = ref(false)
  const errorMessage = ref<string>('')
  let unsubscribe: (() => void) | null = null

  const startListening = () => {
    isLoading.value = true
    isError.value = false

    unsubscribe = subscribeToShoppingLists((newLists) => {
      lists.value = newLists
      isLoading.value = false
      isError.value = false
    })
  }

  // Initialiser l'écoute au montage
  onMounted(() => {
    startListening()
  })

  // Nettoyer l'écoute au démontage
  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    lists,
    isLoading,
    isError,
    errorMessage
  }
}
