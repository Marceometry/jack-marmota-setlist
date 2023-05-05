import { FirebaseDataSnapshot } from '@/hooks'
import { storage } from './constants'

export function getStoragedSongs(param: keyof typeof storage) {
  const storagedSongs = localStorage.getItem(storage[param])
  return storagedSongs ? JSON.parse(storagedSongs) : []
}

export function getSongs() {
  return getStoragedSongs('songs')
}

export function getCheckedSongs() {
  return getStoragedSongs('checkedSongs')
}

export function reorder(array: any[], startIndex: number, endIndex: number) {
  const result = Array.from(array)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function firebaseDataSnapshotToSongList(data: FirebaseDataSnapshot) {
  return Object.entries(data).map(([id, values]) => ({ ...values, id }))
}
