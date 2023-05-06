import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import './animations.css'
import './styles.css'

type Props = {
  open: boolean
  handleOpenChange: (value: boolean) => void
  children: React.ReactNode
  trigger: React.ReactNode
  title: string
  description?: string
  noCloseButton?: boolean
}

export const Modal = ({
  children,
  title,
  description,
  noCloseButton,
  open,
  handleOpenChange,
  trigger,
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='dialog-overlay' />
        <Dialog.Content className='dialog-content'>
          <Dialog.Title className='dialog-title'>{title}</Dialog.Title>
          {!noCloseButton && (
            <Dialog.Close className='dialog-close-button outline'>
              <X size={24} />
            </Dialog.Close>
          )}

          {!!description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
