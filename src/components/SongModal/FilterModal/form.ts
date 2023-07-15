import { CheckFilter, ReadinessFilter, RegionFilter } from '@/hooks'

type Options<T extends string> = Array<{ label: string; value: T }>

export const checkOptions: Options<CheckFilter> = [
  { label: 'Todas', value: 'all' },
  { label: 'Marcadas', value: 'checked' },
  { label: 'Desmarcadas', value: 'unchecked' },
]

export const regionOptions: Options<RegionFilter> = [
  { label: 'Todas', value: 'all' },
  { label: 'Nacionais', value: 'national' },
  { label: 'Internacionais', value: 'international' },
]

export const readinessOptions: Options<ReadinessFilter> = [
  { label: 'Todas', value: 'all' },
  { label: 'Prontas para tocar', value: 'ready' },
  { label: 'Em ensaio', value: 'not_ready' },
]
