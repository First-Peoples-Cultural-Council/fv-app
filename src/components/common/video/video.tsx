import { useState } from 'react';
import Alert from '../alert/alert';

export interface FvVideoProps {
  className?: string;
  disabledClassName?: string;
  src: string;
}

export function FvVideo({
  className,
  disabledClassName,
  src,
}: FvVideoProps) {
  const [showAlt, setShowAlt] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleVideoError = () => {
    setShowAlt(true);
  };

  const handleClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      {showAlt ? (
        <div
          className={`fv-video text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={handleClick}
        ></div>
      ) : (
        <video
          className={className}
          controls
          onError={handleVideoError}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

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

export default FvVideo;
