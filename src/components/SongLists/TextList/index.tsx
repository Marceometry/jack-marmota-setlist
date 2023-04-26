import { ListHeader } from '@/components'
import { useSongs } from '@/contexts'
import { useClipboard } from '@/hooks'

export const TextList = () => {
  const { checkedSongs } = useSongs()
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
