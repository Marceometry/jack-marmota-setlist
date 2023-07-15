import { SongModel } from '@/types'

export function sortAlphabetically(
  array: any[],
  param: string,
  reverse: boolean,
  isNumber?: boolean,
) {
  return [...array].sort((a, b) => {
    if (isNumber) return reverse ? b[param] - a[param] : a[param] - b[param]

    return reverse
      ? b[param]?.localeCompare?.(a[param])
      : a[param]?.localeCompare?.(b[param])
  })
}

export function downloadFile(name: string, content: any, extension = 'txt') {
  const element = document.createElement('a')
  const textFile = new Blob([JSON.stringify(content)])
  element.href = URL.createObjectURL(textFile)
  element.download = `${name}.${extension}`
  document.body.appendChild(element)
  element.click()
}

export function stringToSnakeCase(str: string) {
  const regex =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g

  return str
    ?.match(regex)
    ?.map((x) => x.toLowerCase())
    ?.join('_')
}

export function filterByText(song: SongModel, text: string) {
  const keys = ['name', 'artist'] as Array<keyof SongModel>
  return keys.some((item) => {
    const prop = song[item] as string
    return prop?.toLocaleLowerCase().includes(text.toLocaleLowerCase())
  })
}

export const debounce = (callback: () => void, delay = 300) => {
  let shouldWait = false
  let timeout = null as any

  return () => {
    if (shouldWait && timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback()
      shouldWait = false
    }, delay)

    shouldWait = true
  }
}

// GET READY SONGS
// JSON.parse(localStorage.getItem('@jack-marmota/songs')).filter((item) => item.isReady)
