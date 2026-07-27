import { FaFilm } from 'react-icons/fa6'

// FPCC
import { ALERT_TYPES } from 'constants/notification-types'
import { useNotification } from 'components/contexts/notificationContext'
import { useDetectOnlineStatus } from 'util/useDetectOnlineStatus'

export interface FvVideoProps {
  className?: string
  disabledClassName?: string
  src: string
}

export function FvVideo({ className, disabledClassName, src }: Readonly<FvVideoProps>) {
  const { setNotification } = useNotification()
  const { isOnline } = useDetectOnlineStatus()

  return (
    <>
      {isOnline ? (
        <video src={src} className={className} controls>
          <p>Your browser cannot play the provided video file.</p>
        </video>
      ) : (
        <button
          type="button"
          className={`text-20xl text-gray-300 flex items-center justify-center ${disabledClassName}`}
          onClick={() =>
            setNotification({
              type: ALERT_TYPES.WARNING,
              message: 'Videos are not available offline. Please go online to access this video.',
            })
          }
        >
          <FaFilm />
        </button>
      )}
    </>
  )
}

export default FvVideo
