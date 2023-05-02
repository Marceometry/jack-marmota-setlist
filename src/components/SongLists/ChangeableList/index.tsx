import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ListHeader } from '@/components'
import { useSongs } from '@/contexts'
import { downloadFile } from '@/utils'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'

export const ChangeableList = () => {
  const { checkedSongs, reorderSongs, handleSongCheck } = useSongs()

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

  return (
    <div>
      <ListHeader
        title='Lista ordenada'
        buttons={[{ text: 'Salvar lista ordenada', onClick: saveSongList }]}
      />

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
