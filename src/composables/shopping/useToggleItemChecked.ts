import { toggleItemChecked } from '@/api/shopping/shoppingService'
import type { IShoppingItem } from '@/interfaces/IShoppingItem'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useToggleItemChecked() {
  const toast = useToast()

  const runServices = async (params: { id: string; checked: boolean }): Promise<IShoppingItem> => {
    try {
      const result = await toggleItemChecked(params.id, params.checked)
      // Pas de toast pour éviter les notifications répétées en temps réel
      return result
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({
          message: `Erreur lors de la mise à jour : ${error.message}`
        })
      }
      throw error
    }
  }

  return useRequest<IShoppingItem>({
    runServices
  })
}

