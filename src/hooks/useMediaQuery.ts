import { useEffect, useState } from 'react'
import { debounce } from '@/utils'

export const useMediaQuery = (value = 1024) => {
  const [isSmaller, setIsSmaller] = useState(false)

  useEffect(() => {
    const onResize = debounce(() => {
      setIsSmaller(window.innerWidth <= value)
    })
    onResize()

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [value])

  return isSmaller
}
