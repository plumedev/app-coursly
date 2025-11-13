export enum TOAST_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning'
}

export interface IToast {
  showToast: boolean
  message: string
  keepWhenPageChange: boolean
  color: string
}
