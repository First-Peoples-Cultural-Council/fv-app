import { useAudioContext } from 'components/contexts/audioContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

// Custom hook to handle modal functionality
export function useModal() {
  const navigate = useNavigate()
  const { stopAudio } = useAudioContext()
  const [showModal, setShowModal] = useState<boolean>(false)

  function handleBodyOverflow() {
    document.body.style.overflow = showModal ? 'hidden' : 'unset'
  }

  useEffect(() => {
    // Initialize body overflow
    handleBodyOverflow()

    return () => {
      // Reset body overflow on unmount
      handleBodyOverflow()
    }
  }, [showModal])

  function closeModal() {
    const sourcePageUrl = window.location.hash.split('?')[1]?.split('=')[1]
    if (sourcePageUrl) {
      navigate(sourcePageUrl)
    }
    stopAudio()
    setShowModal(false)
  }

  return { setShowModal, showModal, closeModal }
}
