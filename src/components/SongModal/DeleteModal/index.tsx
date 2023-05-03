import { useState } from 'react'
import { TrashIcon } from '@/assets'
import { Modal, Button } from '@/components'
import { useSongs } from '@/contexts'
import { SongModel } from '@/types'
import './styles.css'

export type DeleteSongModalProps = {
  song: SongModel
}

export const DeleteModal = ({ song }: DeleteSongModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { deleteSong } = useSongs()

  const handleDeleteSong = () => {
    deleteSong(song.id)
    setIsOpen(false)
  }

  const description = !!song
    ? `${song.artist} - ${song.name}. Tem certeza que deseja excluir?`
    : 'Nenhuma música selecionada para excluir'

  return (
    <Modal
      open={isOpen}
      handleOpenChange={setIsOpen}
      noCloseButton
      title='Excluir música'
      description={description}
      trigger={
        <button className='delete-modal-trigger'>
          <TrashIcon />
        </button>
      }
    >
      <div className='delete-song-modal-footer'>
        <Button secondary onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        {!!song && <Button onClick={handleDeleteSong}>Excluir</Button>}
      </div>
    </Modal>
  )
}
