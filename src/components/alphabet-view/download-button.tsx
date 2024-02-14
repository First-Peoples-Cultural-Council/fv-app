import Alert from '../common/alert/alert';
import React, { useState } from 'react';
import { useDetectOnlineStatus } from '../common/hooks/useDetectOnlineStatus';

export interface DownloadButtonProps {
  promptForDownload: () => void;
}

export function DownloadButton({
  promptForDownload,
}: Readonly<DownloadButtonProps>) {
  const { isOnline } = useDetectOnlineStatus();
  const [showAlertNotOnline, setShowAlertNotOnline] = useState(false);
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() =>
          isOnline ? promptForDownload() : setShowAlertNotOnline(true)
        }
      >
        <span className="fv-cloud-arrow-down-regular text-4xl justify-self-end cursor-pointer" />
      </button>
      <Alert
        type={'warning'}
        message="Content not downloaded.  Please try again when you have access to the internet."
        showDismissButton={true}
        showAlert={showAlertNotOnline}
        dismissAlert={function (): void {
          setShowAlertNotOnline(false);
        }}
      />
    </div>
  );
}
