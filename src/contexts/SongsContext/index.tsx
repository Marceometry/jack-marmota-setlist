import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { v4 as uuid } from 'uuid'
import { useFirebaseDatabase, useLocalStorage } from '@/hooks'
import { SongModel } from '@/types'
import { snapshotToSongList, reorder, songListToSnapshot } from './utils'

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
    remoteCheckSongList,
    remoteCheckSong,
  } = useFirebaseDatabase()
  const storage = useLocalStorage()
  const [isLoading, setIsLoading] = useState(true)
  const [songList, setSongList] = useState<SongModel[]>(
    storage.get('songs', []),
  )
  const [checkedSongs, setCheckedSongs] = useState<SongModel[]>(
    storage.get('checked-songs', []),
  )

  useEffect(() => {
    storage.set('songs', songList)
  }, [songList])

  useEffect(() => {
    storage.set('checked-songs', checkedSongs)
  }, [checkedSongs])

  useEffect(() => {
    const unsubscribeOnSongsChange = onSongsChange((data) => {
      const songs = snapshotToSongList(data)
      setSongList(songs)
      setIsLoading(false)
    })

    const unsubscribeOnCheckedChange = onCheckedSongsChange((data) => {
      const songs = snapshotToSongList(data)
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

    if (!songId) return

    const songIndex = checkedSongs.findIndex((song) => song.id === songId)
    if (songIndex >= 0) remoteCheckSong({ ...data, index: songIndex })
  }

  function deleteSong(id: string) {
    remoteDeleteSong(id)
  }

  function handleSongCheck(id: string, checked?: boolean) {
    if (checked) {
      const song = songList.find((item) => item.id === id)
      if (song) remoteCheckSong({ ...song, index: checkedSongs.length })
    } else {
      const songs = checkedSongs.filter((song) => song.id !== id)
      remoteCheckSongList(songListToSnapshot(songs))
    }
  }

  function isSongChecked(id: string) {
    return !!checkedSongs.find((item) => item.id === id)
  }

  function reorderSongs(sourceIndex: number, destinationIndex: number) {
    const reorderedSongs = reorder(checkedSongs, sourceIndex, destinationIndex)
    remoteCheckSongList(songListToSnapshot(reorderedSongs))
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
