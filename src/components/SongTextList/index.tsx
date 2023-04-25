import { SongModel } from '../../types'
import { copySongList } from '../../utils'
import { ListHeader } from '../ListHeader'

export type SongTextListProps = {
  checkedSongs: SongModel[]
}

export const SongTextList = ({ checkedSongs }: SongTextListProps) => {
  const numberOfColumns = Math.ceil(checkedSongs.length / 4)
  const gridTemplateRows = `repeat(${numberOfColumns}, 1fr)`

  return (
    <div>
      <ListHeader
        title='Lista numerada'
        buttons={[
          {
            text: 'Copiar lista numerada',
            onClick: () => copySongList(checkedSongs),
          },
        ]}
      />

      <div className='song-text-list' style={{ gridTemplateRows }}>
        {checkedSongs.map((item, index) => (
          <span key={item.id}>
            {index + 1}. {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}
