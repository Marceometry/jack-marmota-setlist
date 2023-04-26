import { ChangeableList, TableList, TextList } from '@/components'
import { useSongs } from '@/hooks'

export function App() {
  const {
    songList,
    checkedSongs,
    setCheckedSongs,
    handleSongCheck,
    isSongChecked,
  } = useSongs()

  return (
    <div className='container'>
      <div className='lists-container'>
        <TableList
          songList={songList}
          isSongChecked={isSongChecked}
          handleSongCheck={handleSongCheck}
        />

        <ChangeableList
          checkedSongs={checkedSongs}
          setCheckedSongs={setCheckedSongs}
          removeSong={handleSongCheck}
        />
      </div>

      <TextList checkedSongs={checkedSongs} />
    </div>
  )
}
