import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// FPCC
import WordModal from 'components/dictionary-view/word-modal'
import { FvWord, isFvWord } from 'components/common/data'
import { useAudioContext } from 'components/contexts/audioContext'
import PageNotFound from 'components/page-not-found/page-not-found'
import BackButton from 'components/common/back-button/back-button'
import { useDictionaryData } from 'components/dictionary-page/dictionary-page'

function DictionaryEntryView() {
  const { id } = useParams()
  const { stopAll } = useAudioContext()
  const { dictionaryHash } = useDictionaryData()

  const [dictionaryEntry, setDictionaryEntry] = useState<FvWord | null | undefined>(null)

  useEffect(() => {
    if (dictionaryHash && id && !dictionaryEntry) {
      const entry = dictionaryHash?.[id]
      setDictionaryEntry(entry)
    }
  }, [id, dictionaryEntry, dictionaryHash])

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="container mx-auto h-full text-left px-4 mb-14 w-full overflow-auto">
        <div className="flex h-14 items-center justify-left w-full">
          <BackButton />
        </div>
        {dictionaryEntry === undefined && <PageNotFound />}
        {isFvWord(dictionaryEntry) && (
          <WordModal
            term={dictionaryEntry}
            onClose={() => {
              stopAll()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default DictionaryEntryView
