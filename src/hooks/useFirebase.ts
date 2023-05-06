import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import { firebaseApp } from '@/services'
import { SongModel } from '@/types'

type SongWithIndex = SongModel & { index?: number }

export type FirebaseDataSnapshot = {
  [key: string]: SongWithIndex
}

export const useFirebaseDatabase = () => {
  const database = getDatabase(firebaseApp)

  const songsPath = 'songs'
  const checkedSongsPath = 'checked-songs'
  const songsRef = ref(database, songsPath)
  const checkedSongsRef = ref(database, checkedSongsPath)

  const onSongsChange = (callback: (data: FirebaseDataSnapshot) => void) => {
    return onValue(songsRef, (data) =>
      callback(data.exists() ? data.val() : {})
    )
  }

  const remoteAddSong = (song: SongModel) => {
    return set(ref(database, `${songsPath}/${song.id}`), song)
  }

  const remoteDeleteSong = (id: string) => {
    return remove(ref(database, `${songsPath}/${id}`))
  }

  const onCheckedSongsChange = (
    callback: (data: FirebaseDataSnapshot) => void
  ) => {
    return onValue(checkedSongsRef, (data) =>
      callback(data.exists() ? data.val() : {})
    )
  }

  const remoteCheckSongList = (songs: FirebaseDataSnapshot) => {
    return set(ref(database, `${checkedSongsPath}`), songs)
  }

  const remoteCheckSong = (song: SongWithIndex) => {
    return set(ref(database, `${checkedSongsPath}/${song.id}`), song)
  }

  return {
    onSongsChange,
    remoteAddSong,
    remoteDeleteSong,
    onCheckedSongsChange,
    remoteCheckSongList,
    remoteCheckSong,
  }
}
