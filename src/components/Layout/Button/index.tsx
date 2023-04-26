import './styles.css'

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ type = 'button', ...props }) => {
  return (
    <button
      {...props}
      className={`button outline ${props.className || ''}`}
      type={type}
    />
  )
}
