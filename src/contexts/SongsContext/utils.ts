import { FirebaseDataSnapshot } from '@/hooks'
import { SongModel } from '@/types'

export function reorder(array: any[], startIndex: number, endIndex: number) {
  const result = Array.from(array)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function songListToSnapshot(array: SongModel[]) {
  return array.reduce((acc, item, index) => {
    acc[item.id] = { ...item, index }
    return acc
  }, {} as FirebaseDataSnapshot)
}

export function snapshotToSongList(data: FirebaseDataSnapshot) {
  return Object.entries(data).map(([id, values]) => ({ ...values, id }))
}
