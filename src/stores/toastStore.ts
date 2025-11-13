import { defaultToast } from '@/composables/utils/useToast'
import { TOAST_TYPE, type IToast } from '@/interfaces/IToast'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const toastStore = defineStore('toastStore', () => {
  const toast = ref<IToast>(defaultToast[TOAST_TYPE.ERROR])

  const setToast = (payload: IToast) => {
    toast.value = { ...payload, showToast: true }
  }

  const hideToast = () => {
    toast.value.showToast = false
  }

  return {
    toast,
    setToast,
    hideToast
  }
})
