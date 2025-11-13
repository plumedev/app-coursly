import { deleteShoppingItem } from '@/api/shopping/shoppingService'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useDeleteShoppingItem() {
  const toast = useToast()

  const runServices = async (id: string): Promise<void> => {
    try {
      await deleteShoppingItem(id)
      toast.displaySuccess({ message: 'Produit supprimé !' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({ message: `Erreur lors de la suppression : ${error.message}` })
      }
      throw error
    }
  }

  return useRequest<void>({
    runServices
  })
}
