import { TableList, ChangeableList, Loader } from '@/components'
import { useSongs } from '@/contexts'
import './styles.css'

export const Home = () => {
  const { isLoading } = useSongs()

  return (
    <div className="container">
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            width: 56,
            height: 56,
          }}
        >
          <Loader />
        </div>
      )}

      <div className="lists-container">
        <TableList />

        <ChangeableList />
      </div>
    </div>
  )
}
