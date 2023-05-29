import { InputProps } from '@/components'

type AddSongFormFields = {
  songName: InputProps
  artist: InputProps
  duration: InputProps
  startChord: InputProps
  endChord: InputProps
  isNational: InputProps
  isReady: InputProps
}

export const addSongFormFields: AddSongFormFields = {
  songName: {
    name: 'songName',
    placeholder: 'Nome da música',
    required: true,
  },
  artist: { name: 'artist', placeholder: 'Artista', required: true },
  duration: {
    name: 'duration',
    placeholder: 'min',
    type: 'number',
    min: 1,
    max: 20,
  },
  startChord: { name: 'startChord', placeholder: 'Acorde inicial' },
  endChord: { name: 'endChord', placeholder: 'Acorde final' },
  isNational: {
    type: 'checkbox',
    name: 'isNational',
    'aria-label': 'Nacional',
  },
  isReady: {
    type: 'checkbox',
    name: 'isReady',
    'aria-label': 'Pronta para tocar',
  },
}

export type AddSongFormData = {
  [key in keyof typeof addSongFormFields]: string
}
