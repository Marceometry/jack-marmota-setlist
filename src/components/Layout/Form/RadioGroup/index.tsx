import './styles.css'

type Option = { label: string; value: string }

type Props = {
  options: Option[]
  name: string
  value: string
  onChange: (value: string) => void
}

export const RadioGroup = ({ name, value, onChange, options }: Props) => {
  return (
    <fieldset className='radio-group'>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type='radio'
            name={name}
            value={option.value}
            id={option.value}
            checked={option.value === value}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  )
}
