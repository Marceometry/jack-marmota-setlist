import { useState, useEffect } from 'react'
import { CheckCircle, Copy } from 'phosphor-react'
import { SongModel } from '@/types'

function stringifySongList(list: SongModel[]) {
  return list.map((item, index) => `${index + 1}. ${item.name}`).join('\n')
}

export const useClipboard = () => {
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    if (!copySuccess) return
    setTimeout(() => setCopySuccess(false), 1500)
  }, [copySuccess])

  function copyToClipboard(text: string) {
    try {
      navigator?.clipboard.writeText(text)
      setCopySuccess(true)
    } catch (error) {
      alert(error)
      setCopySuccess(false)
    }
  }

  function copySongList(list: SongModel[]) {
    const listAsString = stringifySongList(list)
    copyToClipboard(listAsString)
  }

  const copyIcon = copySuccess ? <CheckCircle /> : <Copy />

  return { copySongList, copyIcon }
}
