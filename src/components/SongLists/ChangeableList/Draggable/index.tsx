import { Draggable as LibDraggable } from 'react-beautiful-dnd'
import { List, Trash } from 'phosphor-react'
import './styles.css'

type Props = {
  index: number
  song: any
  removeSong: (id: string) => void
}

export const Draggable = ({ index, song, removeSong }: Props) => {
  return (
    <LibDraggable key={song.id} draggableId={song.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          style={{
            ...draggableProvided.draggableProps.style,
            backgroundColor: draggableSnapshot.isDragging ? '#3636ac' : '',
          }}
          className='draggable'
        >
          <div
            {...draggableProvided.dragHandleProps}
            style={{ cursor: 'grab' }}
          >
            <List />
          </div>
          <div className='draggable-content'>
            <div>
              <strong>
                {index + 1}. {song.name}
              </strong>
              <span> - {song.artist}</span>
            </div>
            <div>
              <span className='center'>{song.start}</span>
              {' | '}
              <span className='center'>{song.end}</span>
            </div>
          </div>
          <div>
            <button onClick={() => removeSong(song.id)}>
              <Trash />
            </button>
          </div>
        </div>
      )}
    </LibDraggable>
  )
}
