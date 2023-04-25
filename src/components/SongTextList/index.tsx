import { ListHeader } from '@/components'
import { useClipboard } from '@/hooks'
import { SongModel } from '@/types'

export type SongTextListProps = {
  checkedSongs: SongModel[]
}

export const SongTextList = ({ checkedSongs }: SongTextListProps) => {
  const { copySongList, copyIcon } = useClipboard()

  const numberOfColumns = Math.ceil(checkedSongs.length / 4)
  const gridTemplateRows = `repeat(${numberOfColumns}, 1fr)`

  return (
    <div>
      <ListHeader
        title='Lista numerada'
        buttons={[
          {
            text: 'Copiar lista numerada',
            icon: copyIcon,
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
