import { Button } from '@/components'
import './styles.css'

type ButtonProps = {
  text: string
  icon?: React.ReactNode
  onClick: () => void
}

type Props = {
  title: string
  buttons: ButtonProps[]
}

export const ListHeader = ({ title, buttons }: Props) => {
  return (
    <header className='list-header'>
      <h2>{title}:</h2>

      <div>
        {buttons.map((button) => (
          <Button key={button.text} onClick={button.onClick}>
            {button.text}
            {button.icon}
          </Button>
        ))}
      </div>
    </header>
  )
}
