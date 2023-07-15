import { useEffect, useState } from 'react'
import { Funnel } from 'phosphor-react'
import { Button, Form, Grid, Modal, RadioGroup } from '@/components'
import { SongFilters, useLocalStorage } from '@/hooks'
import { checkOptions, readinessOptions, regionOptions } from './form'
import './styles.css'

type Filters = Omit<SongFilters, 'text'>

type Props = {
  filters: Filters | null
  setFilters: (filters: Filters) => void
}

export const FilterModal = ({ filters, setFilters }: Props) => {
  const storage = useLocalStorage()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: Filters) => {
    storage.set('filters', data)
    setFilters(data)
    setIsOpen(false)
  }

  useEffect(() => {
    const data = storage.get('filters')
    setFilters(data)
  }, [])

  return (
    <Modal
      open={isOpen}
      handleOpenChange={setIsOpen}
      title='Filtrar músicas'
      trigger={<Button icon={<Funnel />} />}
    >
      <Form onSubmit={handleSubmit}>
        <Grid>
          <RadioGroup
            name='check'
            options={checkOptions}
            defaultValue={filters?.check || checkOptions[0].value}
          />

          <RadioGroup
            name='region'
            options={regionOptions}
            defaultValue={filters?.region || regionOptions[0].value}
          />

          <RadioGroup
            name='readiness'
            options={readinessOptions}
            defaultValue={filters?.readiness || readinessOptions[0].value}
          />
        </Grid>
        <div className='dialog-form-footer'>
          <Button type='submit'>Confirmar</Button>
        </div>
      </Form>
    </Modal>
  )
}
