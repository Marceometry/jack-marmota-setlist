import { Button, Form, Grid, Input, Modal } from '@/components'
import { useSongs } from '@/contexts'
import { SongModel } from '@/types'
import { AddSongFormData, addSongFormFields } from './form'
import './styles.css'

type Props = {
  open: boolean
  handleOpenChange: (value: boolean) => void
  selectedSong?: SongModel | null
}

export const FormModal = ({ open, handleOpenChange, selectedSong }: Props) => {
  const { addSong } = useSongs()

  const handleSubmit = (data: AddSongFormData) => {
    const payload = {
      name: data.songName,
      artist: data.artist,
      start: data.startChord,
      end: data.endChord,
      duration: data.duration ? Number(data.duration) : null,
    }
    addSong(payload, selectedSong?.id)
    handleOpenChange(false)
  }

  return (
    <Modal
      open={open}
      handleOpenChange={handleOpenChange}
      title={`${!selectedSong ? 'Adicionar' : 'Editar'} Música`}
    >
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid columns='4fr 1fr'>
            <Input
              {...addSongFormFields.songName}
              defaultValue={selectedSong?.name}
            />
            <Input
              {...addSongFormFields.duration}
              defaultValue={String(selectedSong?.duration || '')}
            />
          </Grid>
          <Grid columns='4fr 3fr 3fr'>
            <Input
              {...addSongFormFields.artist}
              defaultValue={selectedSong?.artist}
            />
            <Input
              {...addSongFormFields.startChord}
              defaultValue={selectedSong?.start}
            />
            <Input
              {...addSongFormFields.endChord}
              defaultValue={selectedSong?.end}
            />
          </Grid>
        </Grid>

        <div className='dialog-form-footer'>
          <Button type='submit'>
            {!selectedSong ? 'Adicionar' : 'Confirmar'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
