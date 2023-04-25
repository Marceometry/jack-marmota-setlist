import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ListHeader } from '@/components'
import { downloadFile } from '@/utils'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'

type Props = {
  checkedSongs: any[]
  setCheckedSongs: (value: any[]) => void
  removeSong: (id: string) => void
}

const reorder = (array: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(array)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const ChangeableList = ({
  checkedSongs,
  setCheckedSongs,
  removeSong,
}: Props) => {
  function onDragEnd(result: DropResult) {
    const { destination, source } = result

    if (!destination) return
    if (destination.index === source.index) return

    const reorderedSongs = reorder(
      checkedSongs,
      source.index,
      destination.index
    )
    setCheckedSongs(reorderedSongs)
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
                  removeSong={removeSong}
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
