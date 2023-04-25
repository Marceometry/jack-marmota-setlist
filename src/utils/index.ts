import { storage } from '@/constants'

export function sortAlphabetically(
  array: any[],
  param: string,
  reverse: boolean
) {
  return [...array].sort((a, b) => {
    return reverse
      ? b[param].localeCompare(a[param])
      : a[param].localeCompare(b[param])
  })
}

export function getStoragedSongs(param: keyof typeof storage) {
  const storagedSongs = localStorage.getItem(storage[param])
  return storagedSongs ? JSON.parse(storagedSongs) : []
}

export function downloadFile(name: string, content: any, extension = 'txt') {
  const element = document.createElement('a')
  const textFile = new Blob([JSON.stringify(content)])
  element.href = URL.createObjectURL(textFile)
  element.download = `${name}.${extension}`
  document.body.appendChild(element)
  element.click()
}
