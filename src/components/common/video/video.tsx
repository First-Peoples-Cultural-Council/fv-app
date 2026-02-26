import { useEffect, useState } from 'react'

// FPCC
import IndexedDBService from 'services/indexedDbService'
import { ALERT_TYPES } from 'constants/notification-types'
import { useNotification } from 'components/contexts/notificationContext'
import { useDetectOnlineStatus } from 'util/useDetectOnlineStatus'

export interface FvVideoProps {
  className?: string
  disabledClassName?: string
  src: string
}

export function FvVideo({ className, disabledClassName, src }: Readonly<FvVideoProps>) {
  const [hasFile, setHasFile] = useState(false)
  const { isOnline } = useDetectOnlineStatus()
  const { setNotification } = useNotification()

  useEffect(() => {
    const db = new IndexedDBService('firstVoicesIndexedDb')
    db.hasMediaFile(src).then((hasFile) => {
      setHasFile(hasFile)
    })
  }, [isOnline, src])

  return (
    <>
      {isOnline || hasFile ? (
        <video src={src} className={className} controls>
          <p>Your browser cannot play the provided video file.</p>
        </video>
      ) : (
        <button
          type="button"
          className={`fv-video text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={() =>
            setNotification({
              type: ALERT_TYPES.WARNING,
              message: 'Videos are not available offline. Please go online to access this video.',
            })
          }
        />
      )}
    </>
  )
}

export default FvVideo
