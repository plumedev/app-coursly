import { createShoppingItem } from '@/api/shopping/shoppingService'
import type { ICreateShoppingItem, IShoppingItem } from '@/interfaces/IShoppingItem'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useCreateShoppingItem() {
  const toast = useToast()

  const runServices = async (item: ICreateShoppingItem): Promise<IShoppingItem> => {
    try {
      const result = await createShoppingItem(item)
      toast.displaySuccess({ message: 'Produit ajouté à la liste !' })
      return result
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({ message: `Erreur lors de l'ajout : ${error.message}` })
      }
      throw error
    }
  }

  return useRequest<IShoppingItem>({
    runServices
  })
}
