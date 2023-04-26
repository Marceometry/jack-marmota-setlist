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

export type SongsContextData = {
  songList: SongModel[]
  checkedSongs: SongModel[]
  setCheckedSongs: (list: SongModel[]) => void
  handleSongCheck: (id: string, value?: boolean) => void
  isSongChecked: (id: string) => boolean
}

export type SongsContextProviderProps = {
  children: ReactNode
}

export const SongsContext = createContext({} as SongsContextData)

export function SongsContextProvider({ children }: SongsContextProviderProps) {
  const songList: SongModel[] = useMemo(() => getStoragedSongs('songs'), [])
  const [checkedSongs, setCheckedSongs] = useState<SongModel[]>(() =>
    getStoragedSongs('checkedSongs')
  )

  useEffect(() => {
    localStorage.setItem(storage.checkedSongs, JSON.stringify(checkedSongs))
  }, [checkedSongs])

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
        handleSongCheck,
        isSongChecked,
      }}
    >
      {children}
    </SongsContext.Provider>
  )
}

export const useSongs = () => useContext(SongsContext)
