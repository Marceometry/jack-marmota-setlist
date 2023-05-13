import { X } from 'phosphor-react'
import './styles.css'
import { useRef } from 'react'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  clearable?: boolean
  onChange?: (value: string) => void
}

export const Input = ({ clearable, onChange, ...props }: InputProps) => {
  const ref = useRef<HTMLInputElement | null>(null)

  function clearInput() {
    onChange?.('')
    ref.current?.focus()
  }

  return (
    <div className='input-container'>
      <input
        {...props}
        ref={ref}
        onChange={(e) => onChange?.(e.target.value)}
        className={`input outline ${props.className || ''}`}
      />

      {clearable && !!props.value && (
        <button className='clear-button outline' onClick={clearInput}>
          <X />
        </button>
      )}
    </div>
  )
}
