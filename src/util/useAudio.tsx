import { useEffect, useState, useCallback, useMemo } from 'react'
import IndexedDBService from 'services/indexedDbService'
import { useDetectOnlineStatus } from 'util/useDetectOnlineStatus'
import { useAudioContext } from 'components/contexts/audioContext'

export function useAudio(audioSrc: string) {
  const { currentAudio, playAudio, pauseAudio } = useAudioContext()
  const { isOnline } = useDetectOnlineStatus()

  const [audioPlaying, setAudioPlaying] = useState(false)
  const [hasFile, setHasFile] = useState(false)

  // Check if file exists locally or online
  useEffect(() => {
    const db = new IndexedDBService('firstVoicesIndexedDb')
    db.hasMediaFile(audioSrc).then((exists) => setHasFile(exists))
  }, [isOnline, audioSrc])

  // Check if the global audio element is associated with provided src
  const isSameAudio = useMemo(() => {
    if (!currentAudio) return false
    return currentAudio.src.includes(audioSrc)
  }, [currentAudio, audioSrc])

  // Sync UI state with global audio element
  useEffect(() => {
    if (!currentAudio) {
      setAudioPlaying(false)
      return () => {}
    }

    setAudioPlaying(isSameAudio && !currentAudio.paused)

    const handlePlay = () => {
      if (isSameAudio) setAudioPlaying(true)
    }
    const handlePause = () => {
      if (isSameAudio) setAudioPlaying(false)
    }
    const handleEnded = () => {
      if (isSameAudio) setAudioPlaying(false)
    }

    currentAudio.addEventListener('ended', handleEnded)
    currentAudio.addEventListener('pause', handlePause)
    currentAudio.addEventListener('play', handlePlay)

    return () => {
      currentAudio.removeEventListener('ended', handleEnded)
      currentAudio.removeEventListener('pause', handlePause)
      currentAudio.removeEventListener('play', handlePlay)
    }
  }, [currentAudio, isSameAudio])

  // Update if global audio is explicity stopped
  useEffect(() => {
    if (!currentAudio) {
      setAudioPlaying(false)
    }
  }, [currentAudio])

  // Toggle logic using global audio controller
  const toggleAudio = useCallback(() => {
    if (!audioSrc) return

    if (isSameAudio && audioPlaying) {
      pauseAudio()
    } else {
      playAudio(audioSrc)
    }
  }, [audioSrc, isSameAudio, audioPlaying, pauseAudio, playAudio])

  const audioAvailable = hasFile || isOnline

  return {
    audioAvailable,
    audioPlaying,
    toggleAudio,
  }
}

export default useAudio
