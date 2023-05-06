import { Copy } from 'phosphor-react'
import { ListHeader } from '@/components'
import { useSongs } from '@/contexts'
import { useClipboard, useMediaQuery } from '@/hooks'

export const TextList = () => {
  const { checkedSongs } = useSongs()
  const { copySongList, copyIcon } = useClipboard()
  const md = useMediaQuery(1025)
  const sm = useMediaQuery(550)

  const numberOfColumns = Math.ceil(checkedSongs.length / (sm ? 1 : md ? 2 : 4))
  const gridTemplateRows = `repeat(${numberOfColumns}, 1fr)`

  return (
    <div>
      <ListHeader
        title='Lista numerada'
        buttons={[
          {
            text: 'Copiar',
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
