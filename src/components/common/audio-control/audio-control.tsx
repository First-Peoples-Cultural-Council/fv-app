import { Description } from '@mothertongues/search'
import classNames from 'classnames'

// FPCC
import { ALERT_TYPES } from 'constants/notification-types'
import { useAudio } from 'util/useAudio'
import { useNotification } from 'components/contexts/notificationContext'

export interface AudioControlProps {
  audioSrc: string
  description?: Description | string
  styleType: 'icon' | 'button' | 'native'
}

export function AudioControl({ audioSrc, description, styleType }: Readonly<AudioControlProps>) {
  const { audioAvailable, audioPlaying, toggleAudio } = useAudio(audioSrc)
  const { setNotification } = useNotification()

  const offlineWarning = 'Audio files are not available offline. Please go online to listen to this audio.'

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
            if (audioAvailable) {
              return toggleAudio()
            } else {
              return setNotification({
                type: ALERT_TYPES.WARNING,
                message: offlineWarning,
              })
            }
          }}
        >
          {audioPlaying ? <i className="fv-pause text-3xl" /> : <i className="fv-play text-3xl" />}
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
            if (audioAvailable) {
              return toggleAudio()
            } else {
              return setNotification({
                type: ALERT_TYPES.WARNING,
                message: offlineWarning,
              })
            }
          }}
        >
          {audioPlaying ? <i className="fv-pause" /> : <i className="fv-play" />}
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
              onClick={() => {
                setNotification({
                  type: ALERT_TYPES.WARNING,
                  message: offlineWarning,
                })
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default AudioControl
