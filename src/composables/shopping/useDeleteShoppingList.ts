import { deleteShoppingList } from '@/api/shopping/shoppingListService'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useDeleteShoppingList() {
  const toast = useToast()

  const runServices = async (id: string): Promise<void> => {
    try {
      await deleteShoppingList(id)
      toast.displaySuccess({ message: 'Liste supprimée !' })
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
