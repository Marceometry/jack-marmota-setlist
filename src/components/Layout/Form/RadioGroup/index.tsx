import './styles.css'

type Option = { label: string; value: string }

type Props<T> = {
  options: Option[]
  name: string
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

export const RadioGroup = <T extends string>({
  options,
  name,
  value,
  defaultValue,
  onChange,
}: Props<T>) => {
  return (
    <fieldset className='radio-group'>
      {options.map((option) => {
        const id = name + option.value
        return (
          <div key={option.value}>
            <input
              type='radio'
              id={id}
              name={name}
              value={option.value}
              checked={value ? option.value === value : undefined}
              defaultChecked={option.value === defaultValue}
              onChange={(e) => onChange?.(e.target.value as T)}
            />
            <label htmlFor={id}>{option.label}</label>
          </div>
        )
      })}
    </fieldset>
  )
}
