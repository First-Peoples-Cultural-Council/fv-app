import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export const AudioContext = createContext({
  audios: [] as HTMLAudioElement[],
  addAudio: (audio: HTMLAudioElement) => {},
  removeAudio: (audio: HTMLAudioElement) => {},
  stopAll: () => {},
});

export interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [audios, setAudios] = useState<HTMLAudioElement[]>([]);

  const addAudio = useCallback((audio: HTMLAudioElement) => {
    setAudios((audios: HTMLAudioElement[]): HTMLAudioElement[] => [
      ...audios,
      audio,
    ]);
  }, []);

  const removeAudio = useCallback((audio: HTMLAudioElement) => {
    setAudios((audios) => audios.filter((a) => a !== audio));
  }, []);

  const stopAll = useCallback(() => {
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, [audios]);

  const value = useMemo(
    () => ({
      audios,
      addAudio,
      removeAudio,
      stopAll,
    }),
    [audios, addAudio, removeAudio, stopAll]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
