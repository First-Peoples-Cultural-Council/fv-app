import { useState } from 'react';
import Alert from '../alert/alert';
import { Audio1 } from '@mothertongues/search';
import classNames from 'classnames';
import { useAudio } from '../../../util/useAudio';

export interface AudioButtonProps {
  mtAudio: Audio1;
}

export function AudioButton({ mtAudio }: Readonly<AudioButtonProps>) {
  const [showAlert, setShowAlert] = useState(false);
  const { audio, audioAvailable, audioPlaying, toggleAudio } = useAudio(
    mtAudio.filename
  );

  return audio ? (
    <>
      <button
        data-testid={`audio-btn-${mtAudio.filename}`}
        key={mtAudio.filename}
        className={classNames({
          'btn-contained bg-secondary-500': audioAvailable,
          'opacity-30 btn-contained bg-gray-500': !audioAvailable,
        })}
        onClick={() => {
          audioAvailable ? toggleAudio() : setShowAlert(true);
        }}
      >
        {audioPlaying ? <i className="fv-pause" /> : <i className="fv-play" />}
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
  ) : (
    <></>
  );
}

export default AudioButton;
