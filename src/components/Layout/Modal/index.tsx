import * as Dialog from '@radix-ui/react-dialog'
import { XIcon } from '@/assets'
import './animations.css'
import './styles.css'

type Props = {
  children: React.ReactNode
  title: string
  open: boolean
  handleOpenChange: (value: boolean) => void
}

export const Modal = ({ children, title, open, handleOpenChange }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='dialog-overlay' />
        <Dialog.Content className='dialog-content'>
          <Dialog.Title className='dialog-title'>{title}</Dialog.Title>
          <Dialog.Close className='dialog-close-button outline'>
            <XIcon />
          </Dialog.Close>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
