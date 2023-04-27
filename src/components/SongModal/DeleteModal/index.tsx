import { SongModel } from '@/types'
import { Modal, Button } from '@/components'
import { useSongs } from '@/contexts'
import './styles.css'

export type DeleteSongModalProps = {
  open: boolean
  handleOpenChange: (value: boolean) => void
  selectedSong: SongModel | null
}

export const DeleteModal = ({
  open,
  handleOpenChange,
  selectedSong,
}: DeleteSongModalProps) => {
  const { deleteSong } = useSongs()

  const handleDeleteSong = () => {
    if (selectedSong) deleteSong(selectedSong.id)
    handleOpenChange(false)
  }

  const description = !!selectedSong
    ? `${selectedSong.artist} - ${selectedSong.name}. Tem certeza que deseja excluir?`
    : 'Nenhuma música selecionada para excluir'

  return (
    <Modal
      open={open}
      handleOpenChange={handleOpenChange}
      noCloseButton
      title='Excluir música'
      description={description}
    >
      <div className='delete-song-modal-footer'>
        <Button secondary onClick={() => handleOpenChange(false)}>
          Cancelar
        </Button>
        {!!selectedSong && <Button onClick={handleDeleteSong}>Excluir</Button>}
      </div>
    </Modal>
  )
}
