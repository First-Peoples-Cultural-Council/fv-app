import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react'

type InstallPromptContextType = {
  showInstallPrompt: boolean
  setShowInstallPrompt: (show: boolean) => void
  handleInstallPrompt: () => void
}

export const InstallPromptContext = createContext<InstallPromptContextType>({
  showInstallPrompt: false,
  setShowInstallPrompt: () => {},
  handleInstallPrompt: () => {},
})

export interface InstallPromptProviderProps {
  children: ReactNode
}

export const InstallPromptProvider = ({ children }: InstallPromptProviderProps) => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    sessionStorage.setItem('installPromptActive', showInstallPrompt ? 'true' : 'false')
  }, [showInstallPrompt])

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallPrompt = useCallback(async () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return
    }
    if (deferredPrompt) {
      setShowInstallPrompt(false)
      deferredPrompt.prompt()
      setDeferredPrompt(null)
    }
  }, [deferredPrompt])

  const installPromptContext = useMemo(() => {
    return {
      showInstallPrompt,
      setShowInstallPrompt,
      handleInstallPrompt,
    }
  }, [showInstallPrompt, setShowInstallPrompt, handleInstallPrompt])

  return (
    <InstallPromptContext.Provider value={installPromptContext as unknown as InstallPromptContextType}>
      {children}
    </InstallPromptContext.Provider>
  )
}
