import { useState } from 'react';
import Alert from '../alert/alert';
import { Description } from '@mothertongues/search';
import classNames from 'classnames';
import { useAudio } from '../../../util/useAudio';

export interface AudioControlProps {
  audioSrc: string;
  description?: Description | string;
  styleType: 'icon' | 'button' | 'native';
}

export function AudioControl({
  audioSrc,
  description,
  styleType,
}: Readonly<AudioControlProps>) {
  const [showAlert, setShowAlert] = useState(false);
  const { audioAvailable, audioPlaying, toggleAudio } = useAudio(audioSrc);

  return (
    <>
      {styleType === 'icon' && (
        <button
          data-testid={`audio-btn-${audioSrc}`}
          type="button"
          className={classNames({
            'opacity-30': !audioAvailable,
          })}
          onClick={() => {
            audioAvailable ? toggleAudio() : setShowAlert(true);
          }}
        >
          <i className="fv-volume-up text-3xl" />
        </button>
      )}

      {styleType === 'button' && (
        <button
          data-testid={`audio-btn-${audioSrc}`}
          type="button"
          className={classNames('btn-contained bg-secondary-500', {
            'opacity-30 bg-gray-500': !audioAvailable,
          })}
          onClick={() => {
            audioAvailable ? toggleAudio() : setShowAlert(true);
          }}
        >
          {audioPlaying ? (
            <i className="fv-pause" />
          ) : (
            <i className="fv-play" />
          )}
          {description && <div>{description}</div>}
        </button>
      )}

      {styleType === 'native' && (
        <>
          {audioAvailable ? (
            <audio src={audioSrc} controls />
          ) : (
            <button
              type="button"
              className="fv-songs text-3xl text-gray-400"
              onClick={() => setShowAlert(true)}
            />
          )}
        </>
      )}

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
  );
}

export default AudioControl;
