import { Input, InputProps } from './Input'
import { RadioGroup } from './RadioGroup'

type FormProps = {
  onSubmit: (data: any) => void
  children: React.ReactNode
}

const Form = ({ onSubmit, children }: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formProps = Object.fromEntries(formData)
    onSubmit(formProps)
  }
  return <form onSubmit={handleSubmit}>{children}</form>
}

export { Form, Input, RadioGroup }
export type { InputProps }
