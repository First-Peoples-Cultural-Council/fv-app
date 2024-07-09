import { useState } from 'react';
import Alert from '../alert/alert';
import { Description } from '@mothertongues/search';
import classNames from 'classnames';
import { useAudio } from '../../../util/useAudio';

export interface AudioButtonProps {
  audioSrc: string;
  description?: Description | string;
  isMinimal?: boolean;
}

export function AudioButton({
  audioSrc,
  description,
  isMinimal,
}: Readonly<AudioButtonProps>) {
  const [showAlert, setShowAlert] = useState(false);
  const { audio, audioAvailable, audioPlaying, toggleAudio } =
    useAudio(audioSrc);

  return audio ? (
    <>
      <button
        data-testid={`audio-btn-${audioSrc}`}
        key={audioSrc}
        className={classNames({
          'btn-contained bg-secondary-500': !isMinimal,
          'opacity-30': !audioAvailable,
        })}
        onClick={() => {
          audioAvailable ? toggleAudio() : setShowAlert(true);
        }}
      >
        {isMinimal ? (
          <i className="fv-volume-up text-3xl" />
        ) : (
          <>
            {audioPlaying ? (
              <i className="fv-pause" />
            ) : (
              <i className="fv-play" />
            )}
            {description && <div>{description}</div>}
          </>
        )}
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
