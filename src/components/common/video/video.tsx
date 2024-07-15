import { useEffect, useState } from 'react';

// FPCC
import IndexedDBService from '../../../services/indexedDbService';
import Alert from '../alert/alert';
import { useDetectOnlineStatus } from '../../../util/useDetectOnlineStatus';

export interface FvVideoProps {
  className?: string;
  disabledClassName?: string;
  src: string;
}

export function FvVideo({
  className,
  disabledClassName,
  src,
}: Readonly<FvVideoProps>) {
  const [showAlert, setShowAlert] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const { isOnline } = useDetectOnlineStatus();

  useEffect(() => {
    const db = new IndexedDBService('firstVoicesIndexedDb');
    db.hasMediaFile(src).then((hasFile) => {
      setHasFile(hasFile);
    });
  }, [isOnline, src]);

  return (
    <>
      {isOnline || hasFile ? (
        <video src={src} className={className} controls>
          <p>Your browser cannot play the provided video file.</p>
        </video>
      ) : (
        <button
          type="button"
          className={`fv-video text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={() => setShowAlert(true)}
        />
      )}

      <Alert
        type={'warning'}
        message="This video content has not been downloaded.  Please access when you have access to internet in order to download content."
        showDismissButton={true}
        showAlert={showAlert}
        dismissAlert={function (): void {
          setShowAlert(false);
        }}
      />
    </>
  );
}

export default FvVideo;
