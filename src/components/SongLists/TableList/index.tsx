import { useState, useEffect } from 'react'
import {
  FormModal,
  DeleteModal,
  ListHeader,
  Input,
  PrintModal,
  FilterModal,
} from '@/components'
import { useSongs } from '@/contexts'
import { SongFilters, useClipboard, useSongFilter } from '@/hooks'
import { SongModel } from '@/types'
import { sortAlphabetically } from '@/utils'
import './styles.css'
import './table.css'

const tableHead = [
  { label: 'Nome', value: 'name' },
  { label: 'Artista', value: 'artist' },
  { label: 'Início', value: 'start' },
  { label: 'Fim', value: 'end' },
  //  duration-column { label: 'Min', value: 'duration' },
]

export const TableList = () => {
  const { songList, handleSongCheck, isSongChecked } = useSongs()
  const { copySongList, copyIcon } = useClipboard()
  const filterSongs = useSongFilter()

  const [sortParam, setSortParam] = useState('name')
  const [reverseSort, setReverseSort] = useState(false)
  const [orderedSongs, setOrderedSongs] = useState<SongModel[]>([])
  const [filters, setFilters] = useState<SongFilters | null>(null)

  useEffect(() => {
    const filteredSongList = filterSongs(filters)
    const ordered = sortAlphabetically(
      filteredSongList,
      sortParam,
      reverseSort,
      sortParam === 'duration',
    )
    setOrderedSongs(ordered)
  }, [songList, sortParam, reverseSort, filters])

  const updateFilters = (value: SongFilters) => {
    setFilters((state) => ({ ...state, ...value }))
  }

  const headerButtons = [
    {
      text: 'Copiar',
      icon: copyIcon,
      onClick: () => copySongList(orderedSongs),
    },
  ]

  return (
    <div>
      <ListHeader title='Lista completa' buttons={headerButtons}>
        <FormModal />
        <PrintModal songList={orderedSongs} />
      </ListHeader>

      <div className='filters-container'>
        <FilterModal filters={filters} setFilters={updateFilters} />

        <Input
          clearable
          placeholder='Pesquisar...'
          value={filters?.text || ''}
          onChange={(value) => updateFilters({ text: value })}
        />
      </div>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <td />
              {tableHead.map((item) => {
                const isActive = sortParam === item.value
                const className =
                  isActive && reverseSort
                    ? 'active reverse'
                    : isActive
                    ? 'active'
                    : ''
                return (
                  <th key={item.value}>
                    <button
                      className={`outline ${className}`}
                      onClick={() => {
                        setSortParam(item.value)
                        setReverseSort(isActive ? !reverseSort : false)
                      }}
                    >
                      {item.label}
                    </button>
                  </th>
                )
              })}
              <td />
              <td />
            </tr>
          </thead>
          <tbody>
            {orderedSongs.map((song) => {
              const isChecked = isSongChecked(song.id)
              return (
                <tr key={song.id}>
                  <td className='no-padding'>
                    <DeleteModal song={song} />
                  </td>
                  <td>{song.name}</td>
                  <td>{song.artist}</td>
                  <td>{song.start}</td>
                  <td>{song.end}</td>
                  {/* duration-column <td>{song.duration}</td> */}
                  <td className='no-padding'>
                    <FormModal song={song} />
                  </td>
                  <td
                    className='center clickable'
                    onClick={() => handleSongCheck(song.id, !isChecked)}
                  >
                    <input type='checkbox' checked={isChecked} readOnly />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <span className='table-footer'>{orderedSongs.length} resultados</span>
    </div>
  )
}
