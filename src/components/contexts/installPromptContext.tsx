import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react';

type InstallPromptContextType = {
  showInstallPrompt: boolean;
  setShowInstallPrompt: (show: boolean) => void;
  handleInstallPrompt: () => void;
}

export const InstallPromptContext = createContext<InstallPromptContextType>({
  showInstallPrompt: false,
  setShowInstallPrompt: () => {},
  handleInstallPrompt: () => {},
});

export interface InstallPromptProviderProps {
  children: ReactNode;
}

export const InstallPromptProvider = ({ children }: InstallPromptProviderProps) => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPrompt = async () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }
    if (deferredPrompt) {
      setShowInstallPrompt(false);
      deferredPrompt.prompt();
      setDeferredPrompt(null);
    }
  };

  return (
    <InstallPromptContext.Provider value={{ showInstallPrompt, setShowInstallPrompt, handleInstallPrompt }}>
      {children}
    </InstallPromptContext.Provider>
  );
};



