import { storage } from '../constants'

export const sortAlphabetically = (
  array: any[],
  param: string,
  reverse: boolean
) => {
  return [...array].sort((a, b) => {
    return reverse
      ? b[param].localeCompare(a[param])
      : a[param].localeCompare(b[param])
  })
}

export const getStoragedSongs = (param: keyof typeof storage) => {
  const storagedSongs = localStorage.getItem(storage[param])
  return storagedSongs ? JSON.parse(storagedSongs) : []
}
