import { storage } from './constants'

export function getStoragedSongs(param: keyof typeof storage) {
  const storagedSongs = localStorage.getItem(storage[param])
  return storagedSongs ? JSON.parse(storagedSongs) : []
}
