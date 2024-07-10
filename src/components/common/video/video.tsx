import { SyntheticEvent, useState } from 'react';
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
}: Readonly<FvVideoProps>) {
  const [showAlt, setShowAlt] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleVideoError = (event: SyntheticEvent) => {
    console.error('Error loading video: ', event);
    setShowAlt(true);
  };

  const handleClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      {showAlt ? (
        <button
          type="button"
          className={`fv-video text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={handleClick}
        />
      ) : (
        <video className={className} controls onError={handleVideoError}>
          <source src={src} type="video/mp4" />
        </video>
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
