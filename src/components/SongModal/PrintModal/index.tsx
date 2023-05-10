import { useState } from 'react'
import { FilePdf } from 'phosphor-react'
import { Button, Form, Grid, Input, Modal } from '@/components'
import { useSongs } from '@/contexts'
import { usePrint } from '@/hooks'
import { PrintPreview } from './PrintPreview'
import './styles.css'
import { SongModel } from '@/types'

const previewId = 'print-preview'

type Props = {
  songList: SongModel[]
}

export const PrintModal = ({ songList }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showArtist, setShowArtist] = useState(false)
  const [fontSize, setFontSize] = useState(32)
  const [columns, setColumns] = useState(1)
  const printList = usePrint()

  function print() {
    const preview = document.getElementById(previewId)!
    const content = preview.getElementsByTagName('div')[0]
    const computedFontSize = getComputedStyle(content).fontSize
    const printableHtml = preview.innerHTML.replace(
      computedFontSize,
      `${fontSize}px`
    )

    printList(printableHtml)
  }

  return (
    <Modal
      open={isOpen}
      handleOpenChange={setIsOpen}
      title='Configurações do PDF'
      trigger={<Button icon={<FilePdf />}>Imprimir</Button>}
    >
      <Form onSubmit={print}>
        <Grid columns={2} className='print-dialog-form'>
          <div>
            <label htmlFor='fontSize'>Tamanho da fonte</label>
            <Input
              type='number'
              placeholder='28'
              name='fontSize'
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor='columns'>Colunas</label>
            <Input
              type='number'
              placeholder='2'
              name='columns'
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
            />
          </div>
          <div className='checkbox-container'>
            <input
              type='checkbox'
              id='showArtist'
              name='showArtist'
              checked={showArtist}
              onChange={(e) => setShowArtist(e.target.checked)}
            />
            <label htmlFor='showArtist'>Mostrar artista</label>
          </div>
        </Grid>

        <PrintPreview
          songs={songList}
          showArtist={showArtist}
          fontSize={fontSize}
          columns={columns}
          previewId={previewId}
        />

        <div className='print-dialog-footer'>
          <Button type='submit'>Imprimir</Button>
        </div>
      </Form>
    </Modal>
  )
}
