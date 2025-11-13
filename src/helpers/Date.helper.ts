import { format, parse } from 'date-fns'

export const dateFromArray = (date: number[]): string => {
  return `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`
}

export const dateFormat = (date: Date | number | string | number[], dateFormat = 'dd/MM/yyyy'): string => {
  if (!date) return ''
  if (
    date instanceof Array &&
    typeof date[0] === 'number' &&
    typeof date[1] === 'number' &&
    typeof date[2] === 'number'
  ) {
    date = dateFromArray(date as number[])
  }
  if (typeof date === 'string') {
    const formatString = date.length > 10 ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
    date = parse(date, formatString, new Date())
  }
  return format(date as Date, dateFormat)
}

export const formatDateToFR = (date: Date): string => {
  return new Intl.DateTimeFormat('fr').format(date)
}

export const parseStrDate = (date: string): Date => {
  const [day, month, year] = date.split('/').map(Number)
  return new Date(year, month - 1, day)
}

export const parseStrEnDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const toDateYYYYMMDD = (_date: string): string => {
  if (!_date) {
    return ''
  }
  const date = new Date(_date)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}
