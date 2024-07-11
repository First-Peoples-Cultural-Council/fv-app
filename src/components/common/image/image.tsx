import { useEffect, useState } from 'react';

// FPCC
import IndexedDBService from '../../../services/indexedDbService';
import Alert from '../alert/alert';
import { useDetectOnlineStatus } from '../../../util/useDetectOnlineStatus';

export interface FvImageProps {
  className?: string;
  disabledClassName?: string;
  src: string;
  alt: string;
}

export function FvImage({
  className,
  disabledClassName,
  src,
  alt,
}: Readonly<FvImageProps>) {
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
        <img className={className} src={src} alt={alt} />
      ) : (
        <button
          type="button"
          className={`fv-picture text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={() => setShowAlert(true)}
        />
      )}

      <Alert
        type={'warning'}
        message="This image content has not been downloaded.  Please access when you have access to internet in order to download content."
        showDismissButton={true}
        showAlert={showAlert}
        dismissAlert={function (): void {
          setShowAlert(false);
        }}
      />
    </>
  );
}

export default FvImage;
