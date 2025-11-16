import { updateShoppingList } from '@/api/shopping/shoppingListService'
import type { IShoppingList, IUpdateShoppingList } from '@/interfaces/IShoppingList'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useUpdateShoppingList() {
  const toast = useToast()

  const runServices = async (list: IUpdateShoppingList): Promise<IShoppingList> => {
    try {
      const result = await updateShoppingList(list)
      toast.displaySuccess({ message: 'Liste mise à jour !' })
      return result
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({ message: `Erreur lors de la mise à jour : ${error.message}` })
      }
      throw error
    }
  }

  return useRequest<IShoppingList>({
    runServices
  })
}
