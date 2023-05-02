import { Draggable as LibDraggable } from 'react-beautiful-dnd'
import { ListIcon, TrashIcon } from '@/assets'
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
            // color: draggableSnapshot.isDragging ? 'black' : '',
            backgroundColor: draggableSnapshot.isDragging ? 'darkblue' : '',
            ...draggableProvided.draggableProps.style,
          }}
          className='draggable'
        >
          <div
            {...draggableProvided.dragHandleProps}
            style={{ cursor: 'grab' }}
          >
            <ListIcon />
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
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </LibDraggable>
  )
}
