import React from 'react'
import './styles.css'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  secondary?: boolean
  icon?: React.ReactNode
}

export const Button = React.forwardRef(
  (
    { type = 'button', secondary, ...props }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const className = `button outline ${props.className || ''} ${
      secondary ? 'secondary' : ''
    }`

    return (
      <button {...props} ref={ref} className={className} type={type}>
        {props.children}
        {props.icon}
      </button>
    )
  }
)
