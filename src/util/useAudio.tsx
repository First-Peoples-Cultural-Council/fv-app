import { useEffect, useState } from 'react'

// FPCC
import IndexedDBService from '../services/indexedDbService'
import { useDetectOnlineStatus } from './useDetectOnlineStatus'
import { useAudioContext } from '../components/contexts/audioContext'

export function useAudio(audioSrc: string) {
  const { addAudio, removeAudio, stopAll } = useAudioContext()
  const { isOnline } = useDetectOnlineStatus()

  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [hasFile, setHasFile] = useState(false)

  useEffect(() => {
    if (audioSrc.length > 0) {
      const audioElement = new Audio(audioSrc)
      addAudio(audioElement)
      setAudio(audioElement)
    }
    return () => {
      if (audio) removeAudio(audio)
    }
  }, [])

  useEffect(() => {
    const db = new IndexedDBService('firstVoicesIndexedDb')
    db.hasMediaFile(audioSrc).then((hasFile) => {
      setHasFile(hasFile)
    })
  }, [isOnline, audioSrc])

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setAudioPlaying(false)
      }
    }
    if (audio) {
      audio.onpause = () => {
        setAudioPlaying(false)
      }
    }
  }, [audio])

  function toggleAudio(audio: HTMLAudioElement) {
    if (audioPlaying) {
      setAudioPlaying(false)
      audio.pause()
    } else {
      stopAll()
      setAudioPlaying(true)
      audio.play().catch((err: any) => {
        console.error(err)
      })
    }
  }

  const audioAvailable = hasFile || isOnline

  return {
    audio,
    audioAvailable,
    audioPlaying,
    toggleAudio: () => audio && toggleAudio(audio),
  }
}

export default useAudio
