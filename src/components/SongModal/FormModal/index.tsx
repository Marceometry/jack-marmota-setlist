import { useState } from 'react'
import { PencilSimpleLine, PlusCircle } from 'phosphor-react'
import { Button, Form, Grid, Input, Modal } from '@/components'
import { useSongs } from '@/contexts'
import { SongModel } from '@/types'
import { AddSongFormData, addSongFormFields } from './form'
import './styles.css'

type Props = {
  song?: SongModel | null
}

export const FormModal = ({ song }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { addSong } = useSongs()

  const handleSubmit = (data: AddSongFormData) => {
    const payload = {
      name: data.songName,
      artist: data.artist,
      start: data.startChord,
      end: data.endChord,
      duration: data.duration ? Number(data.duration) : null,
    }
    addSong(payload, song?.id)
    setIsOpen(false)
  }

  const trigger = song ? (
    <button>
      <PencilSimpleLine />
    </button>
  ) : (
    <Button icon={<PlusCircle />}>Adicionar Música</Button>
  )

  return (
    <Modal
      open={isOpen}
      handleOpenChange={setIsOpen}
      title={`${!song ? 'Adicionar' : 'Editar'} Música`}
      trigger={trigger}
    >
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid columns='4fr 1fr'>
            <Input {...addSongFormFields.songName} defaultValue={song?.name} />
            <Input
              {...addSongFormFields.duration}
              defaultValue={String(song?.duration || '')}
            />
          </Grid>
          <Grid columns='4fr 3fr 3fr'>
            <Input {...addSongFormFields.artist} defaultValue={song?.artist} />
            <Input
              {...addSongFormFields.startChord}
              defaultValue={song?.start}
            />
            <Input {...addSongFormFields.endChord} defaultValue={song?.end} />
          </Grid>
        </Grid>

        <div className='dialog-form-footer'>
          <Button type='submit'>{!song ? 'Adicionar' : 'Confirmar'}</Button>
        </div>
      </Form>
    </Modal>
  )
}
