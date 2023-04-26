export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  columns?: string | number
  gap?: string | number
}

export const Grid = ({
  children,
  columns = 1,
  gap = 10,
  ...props
}: GridProps) => {
  const gridTemplateColumns =
    typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns

  return (
    <div
      {...props}
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap,
        ...props.style,
      }}
    >
      {children}
    </div>
  )
}
