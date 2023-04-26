import { Button, Form, Grid, Input, Modal } from '@/components'
import './styles.css'

type AddSongFormData = {
  song_name: string
  duration: string
  artist: string
  start_chord: string
  end_chord: string
}

type Props = {
  open: boolean
  handleOpenChange: (value: boolean) => void
}

export const AddSongModal = ({ open, handleOpenChange }: Props) => {
  const handleSubmit = (data: AddSongFormData) => {
    const duration = data.duration ? Number(data.duration) : null
    console.log({ ...data, duration })
    handleOpenChange(false)
  }

  return (
    <Modal
      open={open}
      handleOpenChange={handleOpenChange}
      title='Adicionar Música'
    >
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid columns='4fr 1fr'>
            <Input name='song_name' placeholder='Nome da música' required />
            <Input
              name='duration'
              placeholder='min'
              type='number'
              min={1}
              max={20}
            />
          </Grid>
          <Grid columns='4fr 3fr 3fr'>
            <Input name='artist' placeholder='Artista' required />
            <Input name='start_chord' placeholder='Acorde inicial' />
            <Input name='end_chord' placeholder='Acorde final' />
          </Grid>
        </Grid>
        <div className='dialog-form-footer'>
          <Button type='submit'>Adicionar</Button>
        </div>
      </Form>
    </Modal>
  )
}
