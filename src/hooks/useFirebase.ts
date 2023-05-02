import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import { firebaseApp } from '@/services'
import { SongModel } from '@/types'

export type FirebaseDataSnapshot = { [key: string]: SongModel }

export const useFirebaseDatabase = () => {
  const database = getDatabase(firebaseApp)

  const songsPath = 'songs'
  const songsRef = ref(database, songsPath)

  const onSongsChange = (callback: (data: FirebaseDataSnapshot) => void) => {
    return onValue(songsRef, (data) =>
      callback(data.exists() ? data.val() : {})
    )
  }

  const remoteAddSong = (song: SongModel) => {
    return set(ref(database, `${songsPath}/${song.id}`), {
      ...song,
    })
  }

  const remoteDeleteSong = (id: string) => {
    return remove(ref(database, `${songsPath}/${id}`))
  }

  return { onSongsChange, remoteAddSong, remoteDeleteSong }
}
