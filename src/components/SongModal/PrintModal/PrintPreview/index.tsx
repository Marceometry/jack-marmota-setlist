import { SongModel } from '@/types'
import './styles.css'

type Props = {
  songs: SongModel[]
  fontSize: number
  columns: number
  previewId: string
}

const width = 720
const height = 1024
const padding = 48
const scrollbarWidth = 10
const ratio = 2

export const PrintPreview = ({
  songs,
  fontSize,
  columns,
  previewId,
}: Props) => {
  return (
    <div
      className='print-preview-container'
      style={{ paddingBottom: padding / ratio - scrollbarWidth }}
    >
      <div
        className='print-preview-scroll-container'
        style={{
          paddingTop: padding / ratio,
          paddingLeft: padding / ratio,
          paddingRight: padding / ratio - scrollbarWidth,
        }}
      >
        <div
          id={previewId}
          style={{
            width: width / ratio - scrollbarWidth,
            height: height / ratio - scrollbarWidth,
          }}
        >
          <div
            // styles have to be inline to work on print
            style={{
              fontSize: `${fontSize / ratio}px`,
              fontFamily: 'sans-serif',
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateRows: `repeat(${Math.ceil(
                songs.length / columns
              )}, 1fr)`,
            }}
          >
            {songs.map((item, index) => (
              <span key={item.id}>
                {index + 1}. {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
