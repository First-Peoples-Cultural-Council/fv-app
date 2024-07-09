import { useEffect, useState } from 'react';
import Alert from '../alert/alert';
import { Audio1 } from '@mothertongues/search';
import classNames from 'classnames';
import IndexedDBService from '../../../services/indexedDbService';
import { useDetectOnlineStatus } from '../../../util/useDetectOnlineStatus';
import { useAudioContext } from '../../contexts/audioContext';

export interface AudioButtonProps {
  mtAudio: Audio1;
}

export function AudioButton({ mtAudio }: Readonly<AudioButtonProps>) {
  const { addAudio, removeAudio } = useAudioContext();
  const db = new IndexedDBService('firstVoicesIndexedDb');
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [audioPlaying, setAudioPlaying] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  const { isOnline } = useDetectOnlineStatus();

  useEffect(() => {
    const audioElement = new Audio(mtAudio.filename);
    addAudio(audioElement);
    setAudio(audioElement);

    db.hasMediaFile(mtAudio.filename).then((hasFile) => {
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
      setAudioPlaying(true);
      audio.play().catch((err: any) => {
        console.error(err);
      });
    }
  }

  const audioAvailable = hasFile || isOnline;

  if (audio) {
    return (
      <>
        <button
          data-testid={`audio-btn-${mtAudio.filename}`}
          key={mtAudio.filename}
          className={classNames({
            'btn-contained bg-secondary-500': audioAvailable,
            'opacity-30 btn-contained bg-gray-500': !audioAvailable,
          })}
          onClick={() => {
            audioAvailable ? toggleAudio(audio) : setShowAlert(true);
          }}
        >
          {audioPlaying ? (
            <i className="fv-pause" />
          ) : (
            <i className="fv-play" />
          )}
          {mtAudio.description && <div>{mtAudio.description}</div>}
        </button>

        <Alert
          type={'warning'}
          message="Audio file not downloaded.  Please access when you have access to internet in order to download content."
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
