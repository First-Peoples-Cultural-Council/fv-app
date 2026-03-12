import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

interface AudioContextValue {
  currentAudio: HTMLAudioElement | null
  playAudio: (src: string) => void
  pauseAudio: () => void
  stopAudio: () => void
}

export const AudioContext = createContext<AudioContextValue>({
  currentAudio: null,
  playAudio: () => {},
  pauseAudio: () => {},
  stopAudio: () => {},
})

export interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const location = useLocation()
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  const playAudio = useCallback(
    (src: string) => {
      // Stop current audio
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }

      const audio = new Audio(src)
      setCurrentAudio(audio)
      audio.play()
    },
    [currentAudio]
  )

  const pauseAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause()
    }
  }, [currentAudio])

  const stopAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setCurrentAudio(null)
    }
  }, [currentAudio])

  // Unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
      }
    }
  }, [currentAudio])

  // Unmount if user navigates away
  useEffect(() => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setCurrentAudio(null)
    }
  }, [location.pathname])

  const value = useMemo(
    () => ({
      currentAudio,
      playAudio,
      pauseAudio,
      stopAudio,
    }),
    [currentAudio, playAudio, pauseAudio, stopAudio]
  )

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export const useAudioContext = () => useContext(AudioContext)
