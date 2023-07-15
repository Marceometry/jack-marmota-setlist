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
  (props: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const { type = 'button', secondary, children, icon } = props

    const className = `button outline ${secondary ? 'secondary' : ''} ${
      !children && icon ? 'icon-button' : ''
    } ${props.className || ''}`

    return (
      <button {...props} ref={ref} className={className} type={type}>
        {children}
        {icon}
      </button>
    )
  },
)
