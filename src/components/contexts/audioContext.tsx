import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface AudioContextValue {
  currentAudio: HTMLAudioElement | null
  playAudio: (src: string) => void
  pauseAudio: () => void
}

export const AudioContext = createContext<AudioContextValue>({
  currentAudio: null,
  playAudio: () => {},
  pauseAudio: () => {},
})

export interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  const pauseAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause()
    }
  }, [currentAudio])

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

  // Unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
      }
    }
  }, [currentAudio])

  const value = useMemo(
    () => ({
      currentAudio,
      playAudio,
      pauseAudio,
    }),
    [currentAudio, playAudio, pauseAudio]
  )

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export const useAudioContext = () => useContext(AudioContext)
