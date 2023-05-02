import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { SongModel } from '@/types'
import { stringToSnakeCase } from '@/utils'
import { storage } from './constants'
import { getStoragedSongs, reorder } from './utils'

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

  function addSong(payload: AddSongData, songId?: string) {
    const snakeCaseArtist = stringToSnakeCase(payload.artist)
    const snakeCaseName = stringToSnakeCase(payload.name)
    const id = `${snakeCaseArtist}-${snakeCaseName}`

    const data = { ...payload, id }
    setSongList((state) =>
      !songId
        ? [...state, data]
        : state.map((song) => (song.id !== songId ? song : data))
    )
    if (songId) {
      setCheckedSongs((state) =>
        state.map((song) => (song.id !== songId ? song : data))
      )
    }
  }

  function deleteSong(id: string) {
    setSongList((state) => state.filter((song) => song.id !== id))
    setCheckedSongs((state) => state.filter((song) => song.id !== id))
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
