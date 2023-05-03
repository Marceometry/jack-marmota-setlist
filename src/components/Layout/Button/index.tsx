import React from 'react'
import './styles.css'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  secondary?: boolean
}

export const Button = React.forwardRef(
  (
    { type = 'button', secondary, ...props }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const className = `button outline ${secondary ? 'secondary' : ''} ${
      props.className || ''
    }`

    return <button {...props} ref={ref} className={className} type={type} />
  }
)
