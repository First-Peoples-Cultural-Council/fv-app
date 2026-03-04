import { useEffect, useState, useCallback } from 'react'
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

  // Sync UI state with global audio element
  useEffect(() => {
    if (!currentAudio) {
      return () => {}
    }

    const handleEnded = () => setAudioPlaying(false)
    const handlePause = () => setAudioPlaying(false)
    const handlePlay = () => setAudioPlaying(true)

    currentAudio.addEventListener('ended', handleEnded)
    currentAudio.addEventListener('pause', handlePause)
    currentAudio.addEventListener('play', handlePlay)

    return () => {
      currentAudio.removeEventListener('ended', handleEnded)
      currentAudio.removeEventListener('pause', handlePause)
      currentAudio.removeEventListener('play', handlePlay)
    }
  }, [currentAudio])

  // Toggle logic using global audio controller
  const toggleAudio = useCallback(() => {
    if (!audioSrc) return

    const isSameAudio = currentAudio && currentAudio.src.includes(audioSrc)

    if (isSameAudio && audioPlaying) {
      pauseAudio()
    } else {
      playAudio(audioSrc)
    }
  }, [audioSrc, currentAudio, audioPlaying, pauseAudio, playAudio])

  const audioAvailable = hasFile || isOnline

  return {
    audioAvailable,
    audioPlaying,
    toggleAudio,
  }
}

export default useAudio
