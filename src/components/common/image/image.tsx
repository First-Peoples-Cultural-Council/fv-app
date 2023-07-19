import { useState } from 'react';
import Alert from '../alert/alert';

export interface FvImageProps {
  className?: string;
  disabledClassName?: string;
  src: string;
  alt: string;
  onClick?: () => void;
}

export function FvImage({ className, disabledClassName, src, alt, onClick }: FvImageProps) {
  const [showAlt, setShowAlt] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageError = () => {
    setShowAlt(true);
  };

  const handleClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      {showAlt ? (
        <div
          className={`fv-picture text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={handleClick}
        ></div>
      ) : (
        <img
          className={className}
          src={src}
          alt={alt}
          onError={handleImageError}
          onClick={onClick}
        />
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

export default FvImage;
