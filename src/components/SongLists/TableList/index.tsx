import { useState, useEffect } from 'react'
import { EditIcon, TrashIcon } from '@/assets'
import {
  FormModal,
  DeleteModal,
  ListHeader,
  Input,
  RadioGroup,
} from '@/components'
import { useSongs } from '@/contexts'
import { useClipboard } from '@/hooks'
import { SongModel } from '@/types'
import { filterByText, sortAlphabetically } from '@/utils'
import './styles.css'

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

  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false)
  const [songToEdit, setSongToEdit] = useState<SongModel | null>(null)

  const [isDeleteSongModalOpen, setIsDeleteSongModalOpen] = useState(false)
  const [songToDelete, setSongToDelete] = useState<SongModel | null>(null)

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

  useEffect(() => {
    if (!isAddSongModalOpen) setSongToEdit(null)
  }, [isAddSongModalOpen])

  const openAddSongModal = () => setIsAddSongModalOpen(true)

  const selectSongToEdit = (song: SongModel) => {
    setSongToEdit(song)
    setIsAddSongModalOpen(true)
  }

  const selectSongToDelete = (song: SongModel) => {
    setSongToDelete(song)
    setIsDeleteSongModalOpen(true)
  }

  const headerButtons = [
    { text: 'Adicionar Música', onClick: openAddSongModal },
    {
      text: 'Copiar lista completa',
      icon: copyIcon,
      onClick: () => copySongList(orderedSongs),
    },
  ]

  return (
    <div>
      <ListHeader title='Lista completa' buttons={headerButtons} />

      <FormModal
        open={isAddSongModalOpen}
        handleOpenChange={setIsAddSongModalOpen}
        selectedSong={songToEdit}
      />

      <DeleteModal
        open={isDeleteSongModalOpen}
        handleOpenChange={setIsDeleteSongModalOpen}
        selectedSong={songToDelete}
      />

      <div className='filters-container'>
        <RadioGroup
          name='check-filter'
          options={radioOptions}
          value={checkFilter}
          onChange={setCheckFilter}
        />

        <Input
          placeholder='Pesquisar...'
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>

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
                    className={className}
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
                <td className='center'>
                  <button
                    className='delete'
                    onClick={() => selectSongToDelete(song)}
                  >
                    <TrashIcon />
                  </button>
                </td>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td className='center'>{song.start}</td>
                <td className='center'>{song.end}</td>
                {/* duration-column <td className='center'>{song.duration}</td> */}
                <td className='center'>
                  <button onClick={() => selectSongToEdit(song)}>
                    <EditIcon />
                  </button>
                </td>
                <td
                  className='center'
                  style={{ cursor: 'pointer' }}
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
  )
}
