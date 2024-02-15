import { useEffect, useState } from 'react';
import Alert from '../alert/alert';
import { FvAudio } from '../data';
import { useButtonStyle } from '../hooks';
import classNames from 'classnames';
import IndexedDBService from '../../../services/indexedDbService';
import { useDetectOnlineStatus } from '../hooks/useDetectOnlineStatus';
import { useAudio } from '../../contexts/audioContext';

export interface AudioButtonProps {
  fvAudio: FvAudio;
}

export function AudioButton({ fvAudio }: AudioButtonProps) {
  const { addAudio, removeAudio } = useAudio();
  const db = new IndexedDBService('firstVoicesIndexedDb');
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [audioPlaying, setAudioPlaying] = useState(false);

  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  const [showAlert, setShowAlert] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  const { isOnline } = useDetectOnlineStatus();

  useEffect(() => {
    db.hasMediaFile(fvAudio.filename).then((response) => {
      setHasFile(response);
      const audioElement = new Audio(fvAudio.filename);
      addAudio(audioElement);
      setAudio(audioElement);
    });
    return () => {
      if (audio) {
        removeAudio(audio);
      }
    };
  }, []);

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
      setAudioPlaying(true);
      audio.play().catch((err: any) => {
        console.error(err);
      });
    }
  }

  if (audio) {
    return (
      <>
        <button
          key={audio.id}
          className={classNames(
            hasFile || isOnline ? secondaryButtonStyle : tertiaryButtonStyle,
            hasFile || isOnline ? '' : 'opacity-30'
          )}
          onClick={() => {
            hasFile || isOnline ? toggleAudio(audio) : setShowAlert(true);
          }}
        >
          {audioPlaying ? (
            <i className="fv-pause" />
          ) : (
            <i className="fv-play" />
          )}
        </button>

        <Alert
          type={'warning'}
          message="Content not downloaded.  Please access when you have access to internet in order to download content."
          showDismissButton={true}
          showAlert={showAlert}
          dismissAlert={function (): void {
            setShowAlert(false);
          }}
        />
      </>
    );
  }
  return null;
}

export default AudioButton;
