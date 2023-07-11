import { useEffect, useState } from 'react';
import Alert from '../alert/alert';
import { FvAudio } from '../data';
import { useButtonStyle } from '../hooks';
import classNames from 'classnames';
import IndexedDBService from '../../../services/indexedDbService';

export interface AudioButtonProps {
  fvAudio: FvAudio;
}

export function AudioButton({ fvAudio }: AudioButtonProps) {
  const db = new IndexedDBService('firstVoicesIndexedDb');

  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  const [showAlert, setShowAlert] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    db.hasMediaFile(fvAudio.filename).then((response) => {
      setHasFile(response);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        key={fvAudio.filename}
        className={classNames(
          hasFile || isOnline ? secondaryButtonStyle : tertiaryButtonStyle,
          hasFile || isOnline ? '' : 'opacity-30'
        )}
        onClick={() =>
          hasFile || isOnline ? playAudio(fvAudio.filename) : setShowAlert(true)
        }
      >
        <i className="fv-play">{fvAudio.speaker}</i>
      </button>

      <Alert
        type={'warning'}
        message="Audio was not able to be downloaded, please connect to internet"
        showDismissButton={true}
        showAlert={showAlert}
        dismissAlert={function (): void {
          setShowAlert(false);
        }}
      />
    </>
  );

  async function playAudio(fileName: string) {
    const audio = new Audio(fileName);
    audio.play().catch((err: any) => {
      console.log(err);
    });
  }
}

export default AudioButton;
