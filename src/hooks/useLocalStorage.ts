const prefix = '@setlist-jack-marmota'

type LocaStorageItem = 'songs' | 'checked-songs' | 'filters'

export const useLocalStorage = () => {
  const get = (item: LocaStorageItem, defaultValue?: any) => {
    const response = localStorage.getItem(`${prefix}/${item}`)
    if (!response) return defaultValue
    return JSON.parse(response)
  }

  const set = (item: LocaStorageItem, data: any) => {
    localStorage.setItem(`${prefix}/${item}`, JSON.stringify(data))
  }

  const remove = (item: LocaStorageItem) => {
    localStorage.removeItem(`${prefix}/${item}`)
  }

  return { get, set, remove }
}
