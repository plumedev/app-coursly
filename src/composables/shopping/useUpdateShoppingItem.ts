import { updateShoppingItem } from '@/api/shopping/shoppingService'
import type { IShoppingItem, IUpdateShoppingItem } from '@/interfaces/IShoppingItem'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useUpdateShoppingItem() {
  const toast = useToast()

  const runServices = async (item: IUpdateShoppingItem): Promise<IShoppingItem> => {
    try {
      const result = await updateShoppingItem(item)
      toast.displaySuccess({ message: 'Produit mis à jour !' })
      return result
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({ message: `Erreur lors de la mise à jour : ${error.message}` })
      }
      throw error
    }
  }

  return useRequest<IShoppingItem>({
    runServices
  })
}
