import { useEffect, useState } from 'react'
import { getStoragedSongs, sortAlphabetically } from './utils'
import { storage, tableHead } from './constants'

type Song = {
  id: string
  name: string
  artist: string
  start: string
  end: string
}

export function App() {
  const [sortParam, setSortParam] = useState('name')
  const [reverseSort, setReverseSort] = useState(false)
  const [orderedSongs, setOrderedSongs] = useState<Song[]>([])

  const [songs] = useState<Song[]>(() => getStoragedSongs('songs'))
  const [checkedSongs, setCheckedSongs] = useState<Song[]>(() =>
    getStoragedSongs('checkedSongs')
  )

  useEffect(() => {
    const ordered = sortAlphabetically(songs, sortParam, reverseSort)
    setOrderedSongs(ordered)
  }, [songs, sortParam, reverseSort])

  useEffect(() => {
    localStorage.setItem(storage.checkedSongs, JSON.stringify(checkedSongs))
  }, [checkedSongs])

  function handleSongCheck(id: string, checked: boolean) {
    if (checked) {
      const song = songs.find((item) => item.id === id)
      if (song) setCheckedSongs((state) => [...state, song])
    } else {
      setCheckedSongs((state) => state.filter((item) => item.id !== id))
    }
  }

  function copySongList() {
    try {
      const songList = document.querySelector('.song-list') as HTMLElement
      navigator?.clipboard.writeText(songList?.innerText)
      alert('Lista copiada!')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <div className='container'>
        <div>
          <h2>Lista completa:</h2>
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
                const isChecked = !!checkedSongs.find(
                  (item) => item.name === song.name
                )
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

        <div>
          <h2>Lista ordenada:</h2>
          <table>
            <thead>
              <tr>
                {tableHead.map((item) => (
                  <th key={item.value}>{item.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {checkedSongs.map((song) => (
                <tr key={song.id}>
                  <td>{song.name}</td>
                  <td>{song.artist}</td>
                  <td className='center'>{song.start}</td>
                  <td className='center'>{song.end}</td>
                  <td>
                    <button onClick={() => handleSongCheck(song.id, false)}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='song-list-container'>
        <div className='song-list-header'>
          <h2>Lista numerada:</h2>
          <button onClick={copySongList}>Copiar lista</button>
        </div>

        <div
          className='song-list'
          style={{
            gridTemplateRows: `repeat(${Math.ceil(
              checkedSongs.length / 4
            )}, 1fr)`,
          }}
        >
          {checkedSongs.map((item, index) => (
            <span key={item.id}>
              {index + 1}. {item.name}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
