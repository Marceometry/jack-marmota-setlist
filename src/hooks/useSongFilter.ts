import { useSongs } from '@/contexts'
import { filterByText } from '@/utils'

export type CheckFilter = 'all' | 'checked' | 'unchecked'
export type RegionFilter = 'all' | 'national' | 'international'
export type ReadinessFilter = 'all' | 'ready' | 'not_ready'

export type SongFilters = {
  text?: string
  check?: CheckFilter
  region?: RegionFilter
  readiness?: ReadinessFilter
}

export const useSongFilter = () => {
  const { songList, isSongChecked } = useSongs()

  function filterSongs(filters: SongFilters | null) {
    if (!filters) return songList
    const { text, check, region, readiness } = filters

    return songList.filter((song) => {
      let included = true

      if (text) {
        included = filterByText(song, text)
        if (!included) return false
      }
      if (check && check !== 'all') {
        const isChecked = isSongChecked(song.id)
        included = check === 'checked' ? isChecked : !isChecked
        if (!included) return false
      }
      if (region && region !== 'all') {
        included = region === 'national' ? song.isNational : !song.isNational
        if (!included) return false
      }
      if (readiness && readiness !== 'all') {
        included = readiness === 'ready' ? song.isReady : !song.isReady
        if (!included) return false
      }

      return included
    })
  }

  return filterSongs
}
