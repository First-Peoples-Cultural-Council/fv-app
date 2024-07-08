import { useState } from 'react';
import Alert from '../alert/alert';

export interface FvImageProps {
  className?: string;
  disabledClassName?: string;
  src: string;
  alt: string;
  onClick?: () => void;
}

export function FvImage({
  className,
  disabledClassName,
  src,
  alt,
  onClick,
}: Readonly<FvImageProps>) {
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
        <button
          type="button"
          className={`fv-picture text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={handleClick}
        />
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
