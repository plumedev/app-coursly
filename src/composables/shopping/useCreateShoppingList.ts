import { createShoppingList } from '@/api/shopping/shoppingListService'
import type { ICreateShoppingList, IShoppingList } from '@/interfaces/IShoppingList'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useCreateShoppingList() {
  const toast = useToast()

  const runServices = async (list: ICreateShoppingList): Promise<IShoppingList> => {
    try {
      const result = await createShoppingList(list)
      toast.displaySuccess({ message: 'Liste créée avec succès !' })
      return result
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({ message: `Erreur lors de la création : ${error.message}` })
      }
      throw error
    }
  }

  return useRequest<IShoppingList>({
    runServices
  })
}
