import './styles.css'

type FormProps = {
  onSubmit: (data: any) => void
  children: React.ReactNode
}

export const Form = ({ onSubmit, children }: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formProps = Object.fromEntries(formData)
    onSubmit(formProps)
  }
  return <form onSubmit={handleSubmit}>{children}</form>
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = (props: InputProps) => {
  return (
    <input {...props} className={`input outline ${props.className || ''}`} />
  )
}
