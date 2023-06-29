import { useState, useEffect } from 'react'
import {
  FormModal,
  DeleteModal,
  ListHeader,
  Input,
  RadioGroup,
  PrintModal,
} from '@/components'
import { useSongs } from '@/contexts'
import { useClipboard } from '@/hooks'
import { SongModel } from '@/types'
import { filterByText, sortAlphabetically } from '@/utils'
import './styles.css'
import './table.css'

const tableHead = [
  { label: 'Nome', value: 'name' },
  { label: 'Artista', value: 'artist' },
  { label: 'Início', value: 'start' },
  { label: 'Fim', value: 'end' },
  //  duration-column { label: 'Min', value: 'duration' },
]

const radioOptions = [
  { label: 'Todas', value: 'all' },
  { label: 'Marcadas', value: 'checked' },
  { label: 'Desmarcadas', value: 'unchecked' },
]

export const TableList = () => {
  const { songList, handleSongCheck, isSongChecked } = useSongs()
  const { copySongList, copyIcon } = useClipboard()

  const [sortParam, setSortParam] = useState('name')
  const [reverseSort, setReverseSort] = useState(false)
  const [orderedSongs, setOrderedSongs] = useState<SongModel[]>([])
  const [checkFilter, setCheckFilter] = useState(radioOptions[0].value)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const filteredByText = filterByText(songList, searchText)
    const filteredSongList =
      checkFilter === 'all'
        ? filteredByText
        : filteredByText.filter(
            (song) =>
              (checkFilter === 'checked' && isSongChecked(song.id)) ||
              (checkFilter === 'unchecked' && !isSongChecked(song.id))
          )
    const ordered = sortAlphabetically(
      filteredSongList,
      sortParam,
      reverseSort,
      sortParam === 'duration'
    )
    setOrderedSongs(ordered)
  }, [songList, sortParam, reverseSort, searchText, checkFilter])

  const headerButtons = [
    {
      text: 'Copiar',
      icon: copyIcon,
      onClick: () => copySongList(orderedSongs),
    },
  ]

  return (
    <div>
      <ListHeader title="Lista completa" buttons={headerButtons}>
        <FormModal />
        <PrintModal songList={orderedSongs} />
      </ListHeader>

      <div className="filters-container">
        <RadioGroup
          name="check-filter"
          options={radioOptions}
          value={checkFilter}
          onChange={setCheckFilter}
        />

        <Input
          placeholder="Pesquisar..."
          onChange={(value) => setSearchText(value)}
          value={searchText}
          clearable
        />
      </div>

      <div className="table-container">
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
                  <td className="no-padding">
                    <DeleteModal song={song} />
                  </td>
                  <td>{song.name}</td>
                  <td>{song.artist}</td>
                  <td>{song.start}</td>
                  <td>{song.end}</td>
                  {/* duration-column <td>{song.duration}</td> */}
                  <td className="no-padding">
                    <FormModal song={song} />
                  </td>
                  <td
                    className="center clickable"
                    onClick={() => handleSongCheck(song.id, !isChecked)}
                  >
                    <input type="checkbox" checked={isChecked} readOnly />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <span className="table-footer">{orderedSongs.length} resultados</span>
    </div>
  )
}
