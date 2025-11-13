import { TOAST_TYPE, type IToast } from '@/interfaces/IToast'
import { i18n } from '@/plugins/i18n'
import { toastStore } from '@/stores/toastStore'
import { storeToRefs } from 'pinia'

export const defaultToast: Record<TOAST_TYPE, IToast> = {
  [TOAST_TYPE.ERROR]: {
    showToast: false,
    message: i18n.global.t('base.toast.error'),
    keepWhenPageChange: false,
    color: 'red'
  },
  [TOAST_TYPE.SUCCESS]: {
    showToast: false,
    message: i18n.global.t('base.toast.success'),
    keepWhenPageChange: false,
    color: 'green'
  },
  [TOAST_TYPE.WARNING]: {
    showToast: false,
    message: i18n.global.t('base.toast.warning'),
    keepWhenPageChange: false,
    color: 'orange'
  }
}

const useToast = () => {
  const store = toastStore()
  const { toast } = storeToRefs(store)
  const { setToast, hideToast } = store

  const displayError = (arg?: { message: string; keepWhenPageChange?: boolean }) => {
    hideToast()
    setToast({
      ...defaultToast[TOAST_TYPE.ERROR],
      ...arg,
      keepWhenPageChange: arg?.keepWhenPageChange ?? false
    })
  }

  const displaySuccess = (arg?: { message: string; keepWhenPageChange?: boolean }) => {
    hideToast()
    setToast({
      ...defaultToast[TOAST_TYPE.SUCCESS],
      ...arg,
      keepWhenPageChange: arg?.keepWhenPageChange ?? false
    })
  }

  const displayWarning = (arg?: { message: string; keepWhenPageChange?: boolean }) => {
    hideToast()
    setToast({
      ...defaultToast[TOAST_TYPE.WARNING],
      ...arg,
      keepWhenPageChange: arg?.keepWhenPageChange ?? false
    })
  }

  return {
    toast,
    displayError,
    displaySuccess,
    displayWarning
  }
}
export default useToast
