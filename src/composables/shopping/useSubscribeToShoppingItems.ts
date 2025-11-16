import { ref, onMounted, onUnmounted, watch, type Ref, type ComputedRef } from 'vue'
import { subscribeToShoppingItems } from '@/api/shopping/shoppingService'
import type { IShoppingItem } from '@/interfaces/IShoppingItem'

export function useSubscribeToShoppingItems(listId: Ref<string | null> | ComputedRef<string | null> | string | null) {
  const items = ref<IShoppingItem[]>([])
  const isLoading = ref(true)
  const isError = ref(false)
  const errorMessage = ref<string>('')
  let unsubscribe: (() => void) | null = null

  const getListId = () => {
    if (listId === null || typeof listId === 'string') {
      return listId
    }
    return 'value' in listId ? listId.value : null
  }

  const startListening = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }

    const currentListId = getListId()
    if (!currentListId) {
      items.value = []
      isLoading.value = false
      isError.value = false
      return
    }

    isLoading.value = true
    isError.value = false

    unsubscribe = subscribeToShoppingItems(currentListId, (newItems) => {
      items.value = newItems
      isLoading.value = false
      isError.value = false
    })
  }

  // Initialiser l'écoute au montage
  onMounted(() => {
    startListening()
  })

  // Réécouter quand listId change
  if (listId !== null && typeof listId === 'object' && 'value' in listId) {
    watch(listId, () => {
      startListening()
    })
  }

  // Nettoyer l'écoute au démontage
  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    items,
    isLoading,
    isError,
    errorMessage
  }
}
