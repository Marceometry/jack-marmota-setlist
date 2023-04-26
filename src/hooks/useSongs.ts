import { useMemo, useState, useEffect } from 'react'
import { storage } from '@/constants'
import { SongModel } from '@/types'
import { getStoragedSongs } from '@/utils'

export const useSongs = () => {
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

  return {
    songList,
    checkedSongs,
    setCheckedSongs,
    handleSongCheck,
    isSongChecked,
  }
}
