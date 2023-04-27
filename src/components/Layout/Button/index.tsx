import './styles.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean
}

export const Button = ({ type = 'button', secondary, ...props }: Props) => {
  const className = `button outline ${secondary ? 'secondary' : ''} ${
    props.className || ''
  }`

  return <button {...props} className={className} type={type} />
}
