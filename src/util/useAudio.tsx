import { useEffect, useState } from 'react';

// FPCC
import IndexedDBService from '../services/indexedDbService';
import { useDetectOnlineStatus } from './useDetectOnlineStatus';
import { useAudioContext } from '../components/contexts/audioContext';

export function useAudio(audioSrc: string) {
  const { addAudio, removeAudio, stopAll } = useAudioContext();
  const db = new IndexedDBService('firstVoicesIndexedDb');
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [audioPlaying, setAudioPlaying] = useState(false);

  const [hasFile, setHasFile] = useState(false);

  const { isOnline } = useDetectOnlineStatus();

  useEffect(() => {
    const audioElement = new Audio(audioSrc);
    addAudio(audioElement);
    setAudio(audioElement);

    db.hasMediaFile(audioSrc).then((hasFile) => {
      setHasFile(hasFile);
    });
    return () => {
      if (audio) {
        removeAudio(audio);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setAudioPlaying(false);
      };
    }
  }, [audio]);

  function toggleAudio(audio: HTMLAudioElement) {
    if (audioPlaying) {
      setAudioPlaying(false);
      audio.pause();
    } else {
      stopAll();
      setAudioPlaying(true);
      audio.play().catch((err: any) => {
        console.error(err);
      });
    }
  }

  const audioAvailable = hasFile || isOnline;

  return {
    audio,
    audioAvailable,
    audioPlaying,
    toggleAudio: () => audio && toggleAudio(audio),
  };
}

export default useAudio;
