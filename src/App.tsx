import { SongsContextProvider } from '@/contexts'
import { Home } from '@/pages'

export function App() {
  return (
    <SongsContextProvider>
      <Home />
    </SongsContextProvider>
  )
}
