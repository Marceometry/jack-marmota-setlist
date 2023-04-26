import { useState, useEffect } from 'react'
import { AddSongModal, ListHeader } from '@/components'
import { useClipboard } from '@/hooks'
import { SongModel } from '@/types'
import { sortAlphabetically } from '@/utils'
import './styles.css'

const tableHead = [
  { label: 'Nome', value: 'name' },
  { label: 'Artista', value: 'artist' },
  { label: 'Início', value: 'start' },
  { label: 'Fim', value: 'end' },
]

type Props = {
  songList: SongModel[]
  isSongChecked: (id: string) => boolean
  handleSongCheck: (id: string, value: boolean) => void
}

export const TableList = ({
  songList,
  isSongChecked,
  handleSongCheck,
}: Props) => {
  const { copySongList, copyIcon } = useClipboard()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortParam, setSortParam] = useState('name')
  const [reverseSort, setReverseSort] = useState(false)
  const [orderedSongs, setOrderedSongs] = useState<SongModel[]>([])

  useEffect(() => {
    const ordered = sortAlphabetically(songList, sortParam, reverseSort)
    setOrderedSongs(ordered)
  }, [songList, sortParam, reverseSort])

  const openModal = () => setIsModalOpen(true)

  const headerButtons = [
    { text: 'Adicionar Música', onClick: openModal },
    {
      text: 'Copiar lista completa',
      icon: copyIcon,
      onClick: () => copySongList(orderedSongs),
    },
  ]

  return (
    <div>
      <ListHeader title='Lista completa' buttons={headerButtons} />

      <AddSongModal open={isModalOpen} handleOpenChange={setIsModalOpen} />

      <table>
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {orderedSongs.map((song) => {
            const isChecked = isSongChecked(song.id)
            return (
              <tr key={song.id}>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td className='center'>{song.start}</td>
                <td className='center'>{song.end}</td>
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
