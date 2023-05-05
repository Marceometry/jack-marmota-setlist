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
  getCheckedSongs,
  getSongs,
  getStoragedSongs,
  reorder,
} from './utils'

type AddSongData = Omit<SongModel, 'id'>

export type SongsContextData = {
  isLoading: boolean
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
  const {
    onSongsChange,
    remoteAddSong,
    remoteDeleteSong,
    onCheckedSongsChange,
    remoteReorderCheckedSongs,
    remoteCheckSong,
    remoteUncheckSong,
  } = useFirebaseDatabase()
  const [isLoading, setIsLoading] = useState(true)
  const [songList, setSongList] = useState<SongModel[]>(getSongs)
  const [checkedSongs, setCheckedSongs] = useState<SongModel[]>(getCheckedSongs)

  useEffect(() => {
    localStorage.setItem(storage.songs, JSON.stringify(songList))
  }, [songList])

  useEffect(() => {
    localStorage.setItem(storage.checkedSongs, JSON.stringify(checkedSongs))
  }, [checkedSongs])

  useEffect(() => {
    const unsubscribeOnSongsChange = onSongsChange((data) => {
      const songs = firebaseDataSnapshotToSongList(data)
      setSongList(songs)
      setIsLoading(false)
    })

    const unsubscribeOnCheckedChange = onCheckedSongsChange((data) => {
      const songs = firebaseDataSnapshotToSongList(data)
      setCheckedSongs(songs.sort((a, b) => (a.index || 0) - (b.index || 0)))
      setIsLoading(false)
    })

    return () => {
      unsubscribeOnSongsChange()
      unsubscribeOnCheckedChange()
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
      if (song) remoteCheckSong({ ...song, index: checkedSongs.length })
    } else {
      remoteUncheckSong(id)
    }
  }

  function isSongChecked(id: string) {
    return !!checkedSongs.find((item) => item.id === id)
  }

  function reorderSongs(sourceIndex: number, destinationIndex: number) {
    const reorderedSongs = reorder(checkedSongs, sourceIndex, destinationIndex)
    remoteReorderCheckedSongs(
      reorderedSongs.reduce((acc, item, index) => {
        acc[item.id] = { ...item, index }
        return acc
      }, {})
    )
  }

  return (
    <SongsContext.Provider
      value={{
        isLoading,
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
