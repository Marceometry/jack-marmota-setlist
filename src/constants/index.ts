const STORAGE_BASE_URL = '@jack-marmota/'

export const storage = {
  songs: STORAGE_BASE_URL + 'songs',
  checkedSongs: STORAGE_BASE_URL + 'checked-songs',
}

export const tableHead = [
  { label: 'Nome', value: 'name' },
  { label: 'Artista', value: 'artist' },
  { label: 'Início', value: 'start' },
  { label: 'Fim', value: 'end' },
]
