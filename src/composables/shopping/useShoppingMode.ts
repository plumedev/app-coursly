import { ref, onMounted, onUnmounted } from 'vue'
import { setShoppingMode, subscribeToShoppingMode } from '@/api/shopping/shoppingService'
import useToast from '@/composables/utils/useToast'

export function useShoppingMode() {
  const toast = useToast()
  const isShoppingModeActive = ref(false)
  let unsubscribe: (() => void) | null = null

  // Écouter les changements en temps réel
  const startListening = () => {
    unsubscribe = subscribeToShoppingMode((isActive) => {
      isShoppingModeActive.value = isActive
    })
  }

  // Activer ou désactiver le mode courses
  const toggleShoppingMode = async (isActive: boolean) => {
    try {
      await setShoppingMode(isActive)
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

