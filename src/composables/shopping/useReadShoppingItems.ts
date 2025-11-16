import { getShoppingItems } from '@/api/shopping/shoppingService'
import type { IShoppingItem } from '@/interfaces/IShoppingItem'
import { useRequest } from '@/composables/utils/useRequest'
import useToast from '@/composables/utils/useToast'

export function useReadShoppingItems(listId: string) {
  const toast = useToast()

  const runServices = async (): Promise<IShoppingItem[]> => {
    try {
      const result = await getShoppingItems(listId)
      return result
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.displayError({ message: `Erreur lors de la récupération : ${error.message}` })
      }
      throw error
    }
  }

  return useRequest<IShoppingItem[]>({
    runServices,
    options: {
      immediate: true
    }
  })
}
