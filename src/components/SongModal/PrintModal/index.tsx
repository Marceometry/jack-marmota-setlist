import { useState } from 'react'
import { FilePdf } from 'phosphor-react'
import { Button, Form, Grid, Input, Modal } from '@/components'
import { useSongs } from '@/contexts'
import { usePrint } from '@/hooks'
import { PrintPreview } from './PrintPreview'
import './styles.css'

const previewId = 'print-preview'

export const PrintModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(28)
  const [columns, setColumns] = useState(2)
  const { checkedSongs } = useSongs()
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
        </Grid>

        <PrintPreview
          songs={checkedSongs}
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
