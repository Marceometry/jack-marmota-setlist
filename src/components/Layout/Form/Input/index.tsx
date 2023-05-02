import './styles.css'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = (props: InputProps) => {
  return (
    <input {...props} className={`input outline ${props.className || ''}`} />
  )
}
