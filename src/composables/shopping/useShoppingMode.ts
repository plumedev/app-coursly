import { ref, onMounted, onUnmounted, watch, type Ref, type ComputedRef } from 'vue'
import { setShoppingMode, subscribeToShoppingMode } from '@/api/shopping/shoppingService'
import useToast from '@/composables/utils/useToast'

export function useShoppingMode(listId: Ref<string | null> | ComputedRef<string | null> | string | null) {
  const toast = useToast()
  const isShoppingModeActive = ref(false)
  let unsubscribe: (() => void) | null = null

  const getListId = () => {
    if (listId === null || typeof listId === 'string') {
      return listId
    }
    return 'value' in listId ? listId.value : null
  }

  // Écouter les changements en temps réel
  const startListening = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }

    const currentListId = getListId()
    if (!currentListId) {
      isShoppingModeActive.value = false
      return
    }

    unsubscribe = subscribeToShoppingMode(currentListId, (isActive) => {
      isShoppingModeActive.value = isActive
    })
  }

  // Activer ou désactiver le mode courses
  const toggleShoppingMode = async (isActive: boolean) => {
    const currentListId = getListId()
    if (!currentListId) {
      toast.displayError({ message: 'Aucune liste sélectionnée' })
      return
    }

    try {
      await setShoppingMode(currentListId, isActive)
      toast.displaySuccess({
        message: isActive ? 'Mode courses activé !' : 'Mode courses désactivé !'
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({
          message: `Erreur lors de la modification du mode : ${error.message}`
        })
      }
      throw error
    }
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
    isShoppingModeActive,
    toggleShoppingMode
  }
}
