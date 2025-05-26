import { useContext, useEffect, useState } from 'react'

// FPCC
import WordModal from 'components/dictionary-view/word-modal'
import Modal from 'components/common/modal/modal'
import fetchWordOfDayData from 'services/wordOfTheDayApiService'
import { FvWord } from 'components/common/data'
import FullScreenModal from 'components/common/full-screen-modal/full-screen-modal'
import { LoadingSpinner } from 'components/common/loading-spinner/loading-spinner'
import { useAudioContext } from 'components/contexts/audioContext'
import { InstallPromptContext } from 'components/contexts/installPromptContext'

export interface WordOfTheDayProps {
  dictionaryData: FvWord[]
}

function WordOfTheDay({ dictionaryData }: Readonly<WordOfTheDayProps>) {
  const today = new Date()
  const { stopAll } = useAudioContext()
  const { showInstallPrompt } = useContext(InstallPromptContext)

  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<FvWord | null>(null)

  useEffect(() => {
    if (today.toDateString() !== (localStorage.getItem('lastWOTDSeenOn') ?? '') && !showInstallPrompt) {
      setShowModal(true)
    }
  }, [showInstallPrompt])

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('word-of-the-day-modal-open')
    } else {
      document.body.classList.remove('word-of-the-day-modal-open')
    }

    return () => {
      document.body.classList.remove('word-of-the-day-modal-open')
    }
  }, [showModal])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWordOfTheDay()
      setData(response)
    }

    fetchData().catch((err: any) => {
      console.error(err)
    })
  }, [dictionaryData])

  async function getWordOfTheDay() {
    try {
      const data = await fetchWordOfDayData()
      return (
        dictionaryData.find((term) => term.entryID === data.dictionaryEntry.id) ??
        dictionaryData[Math.floor(Math.random() * (dictionaryData?.length || 0))]
      )
    } catch {
      return dictionaryData?.[Math.floor(Math.random() * (dictionaryData?.length || 0))]
    }
  }

  function wordOfTheDaySeen() {
    localStorage.setItem('lastWOTDSeenOn', today.toDateString())
    setShowModal(false)
  }

  if (data) {
    if (showModal) {
      if (window.matchMedia('(min-width: 768px').matches) {
        return (
          <Modal onClose={() => wordOfTheDaySeen()}>
            <div className="w-full text-center text-3xl mb-5">Word of the Day</div>
            <WordModal
              term={data}
              onClose={() => {
                wordOfTheDaySeen()
                stopAll()
              }}
            />
          </Modal>
        )
      } else if (!window.matchMedia('(min-width: 768px').matches) {
        return (
          <FullScreenModal onClose={() => wordOfTheDaySeen()}>
            <div className="flex w-full text-center text-3xl mb-5">Word of the Day</div>
            <WordModal
              term={data}
              onClose={() => {
                wordOfTheDaySeen()
                stopAll()
              }}
            />
          </FullScreenModal>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  } else {
    return <LoadingSpinner />
  }
}

export default WordOfTheDay
