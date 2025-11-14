import { ref, onMounted, onUnmounted } from 'vue'
import { subscribeToShoppingItems } from '@/api/shopping/shoppingService'
import type { IShoppingItem } from '@/interfaces/IShoppingItem'

export function useSubscribeToShoppingItems() {
  const items = ref<IShoppingItem[]>([])
  const isLoading = ref(true)
  const isError = ref(false)
  const errorMessage = ref<string>('')
  let unsubscribe: (() => void) | null = null

  const startListening = () => {
    isLoading.value = true
    isError.value = false
    
    unsubscribe = subscribeToShoppingItems((newItems) => {
      items.value = newItems
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
    items,
    isLoading,
    isError,
    errorMessage
  }
}

