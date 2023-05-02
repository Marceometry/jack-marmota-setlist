import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { v4 as uuid } from 'uuid'
import { useFirebaseDatabase } from '@/hooks'
import { SongModel } from '@/types'
import { storage } from './constants'
import {
  firebaseDataSnapshotToSongList,
  getStoragedSongs,
  reorder,
} from './utils'

type AddSongData = Omit<SongModel, 'id'>

export type SongsContextData = {
  songList: SongModel[]
  checkedSongs: SongModel[]
  addSong: (data: AddSongData, id?: string) => void
  deleteSong: (id: string) => void
  handleSongCheck: (id: string, value?: boolean) => void
  isSongChecked: (id: string) => boolean
  reorderSongs: (sourceIndex: number, destinationIndex: number) => void
}

export type SongsContextProviderProps = {
  children: ReactNode
}

export const SongsContext = createContext({} as SongsContextData)

export function SongsContextProvider({ children }: SongsContextProviderProps) {
  const { onSongsChange, remoteAddSong, remoteDeleteSong } =
    useFirebaseDatabase()
  const [songList, setSongList] = useState<SongModel[]>(() =>
    getStoragedSongs('songs')
  )
  const [checkedSongs, setCheckedSongs] = useState<SongModel[]>(() =>
    getStoragedSongs('checkedSongs')
  )

  useEffect(() => {
    localStorage.setItem(storage.songs, JSON.stringify(songList))
  }, [songList])

  useEffect(() => {
    localStorage.setItem(storage.checkedSongs, JSON.stringify(checkedSongs))
  }, [checkedSongs])

  useEffect(() => {
    const unsubscribeOnChange = onSongsChange((data) => {
      const songs = firebaseDataSnapshotToSongList(data)
      setSongList(songs)
      setCheckedSongs((state) =>
        state.reduce((acc: SongModel[], item) => {
          const song = songs.find((s) => s.id === item.id)
          if (song) acc.push(song)
          return acc
        }, [])
      )
    })

    return () => {
      unsubscribeOnChange()
    }
  }, [])

  function addSong(payload: AddSongData, songId?: string) {
    const data = { ...payload, id: songId || uuid() }
    remoteAddSong(data)
  }

  function deleteSong(id: string) {
    remoteDeleteSong(id)
  }

  function handleSongCheck(id: string, checked?: boolean) {
    if (checked) {
      const song = songList.find((item) => item.id === id)
      if (song) setCheckedSongs((state) => [...state, song])
    } else {
      setCheckedSongs((state) => state.filter((item) => item.id !== id))
    }
  }

  function isSongChecked(id: string) {
    return !!checkedSongs.find((item) => item.id === id)
  }

  function reorderSongs(sourceIndex: number, destinationIndex: number) {
    const reorderedSongs = reorder(checkedSongs, sourceIndex, destinationIndex)
    setCheckedSongs(reorderedSongs)
  }

  return (
    <SongsContext.Provider
      value={{
        songList,
        checkedSongs,
        addSong,
        deleteSong,
        handleSongCheck,
        isSongChecked,
        reorderSongs,
      }}
    >
      {children}
    </SongsContext.Provider>
  )
}

export const useSongs = () => useContext(SongsContext)
