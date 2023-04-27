import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react'
import { SongModel } from '@/types'
import { storage } from './constants'
import { getStoragedSongs } from './utils'
import { stringToSnakeCase } from '@/utils'

type AddSongData = Omit<SongModel, 'id'>

export type SongsContextData = {
  songList: SongModel[]
  checkedSongs: SongModel[]
  setCheckedSongs: (list: SongModel[]) => void
  addSong: (data: AddSongData, id?: string) => void
  deleteSong: (id: string) => void
  handleSongCheck: (id: string, value?: boolean) => void
  isSongChecked: (id: string) => boolean
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

  return (
    <SongsContext.Provider
      value={{
        songList,
        checkedSongs,
        setCheckedSongs,
        addSong,
        deleteSong,
        handleSongCheck,
        isSongChecked,
      }}
    >
      {children}
    </SongsContext.Provider>
  )
}

export const useSongs = () => useContext(SongsContext)
