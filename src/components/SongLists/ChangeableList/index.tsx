import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ListHeader } from '@/components'
import { useSongs } from '@/contexts'
import { downloadFile } from '@/utils'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import { usePrint } from '@/hooks'

export const ChangeableList = () => {
  const { checkedSongs, reorderSongs, handleSongCheck } = useSongs()
  const printList = usePrint()

  function onDragEnd(result: DropResult) {
    const { destination, source } = result

    if (!destination) return
    if (destination.index === source.index) return

    reorderSongs(source.index, destination.index)
  }

  function saveSongList() {
    const fileName = `song-list-${new Date().toISOString()}`
    downloadFile(fileName, checkedSongs, 'json')
  }

  const printableHtml = `<div style="font-size: 22px; display: grid; grid-template-rows: repeat(${Math.ceil(
    checkedSongs.length / 2
  )}, 1fr); grid-auto-flow: column;">
  ${checkedSongs
    .map((item, index) => `<span>${index + 1}. ${item.name}</span>`)
    .join('')}
  </div>`

  const buttons = [
    {
      text: 'Imprimir',
      onClick: () => printList(printableHtml),
    },
    { text: 'Baixar', onClick: saveSongList },
  ]

  return (
    <div>
      <ListHeader title='Lista ordenada' buttons={buttons} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='checked-songs' direction='vertical'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {checkedSongs.map((song, index) => (
                <Draggable
                  key={song.id}
                  index={index}
                  song={song}
                  removeSong={handleSongCheck}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
