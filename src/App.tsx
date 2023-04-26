import { ChangeableList, TableList, TextList } from '@/components'
import { SongsContextProvider } from '@/contexts'

export function App() {
  return (
    <SongsContextProvider>
      <div className='container'>
        <div className='lists-container'>
          <TableList />

          <ChangeableList />
        </div>

        <TextList />
      </div>
    </SongsContextProvider>
  )
}
