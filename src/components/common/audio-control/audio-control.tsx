import { useEffect, useState } from 'react';
import Alert from '../alert/alert';
import { FVMedia } from '../data';
import IndexedDBService from '../../../services/indexedDbService';

export interface AudioControlProps {
  className?: string;
  disabledClassName?: string;
  audio: FVMedia;
}

export function AudioControl({
  className,
  disabledClassName,
  audio,
}: AudioControlProps) {
  const db = new IndexedDBService('firstVoicesIndexedDb');

  const [showAlert, setShowAlert] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    db.hasMediaFile(audio.original.path).then((response) => {
      setHasFile(response);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      {isOnline || hasFile ? (
        <audio controls className={className}>
          <source
            src={audio.original.path}
            type={audio.original.mimetype}
          ></source>
        </audio>
      ) : (
        <div
          className={`fv-songs text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={handleClick}
        ></div>
      )}

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
}

export default AudioControl;
