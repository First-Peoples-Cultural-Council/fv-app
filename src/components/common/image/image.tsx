import { useEffect, useState } from 'react'

// FPCC
import { ALERT_TYPES } from 'constants/notification-types'
import { useDetectOnlineStatus } from 'util/useDetectOnlineStatus'
import { useNotification } from 'components/contexts/notificationContext'
import IndexedDBService from 'services/indexedDbService'

export interface FvImageProps {
  className?: string
  disabledClassName?: string
  src: string
  alt: string
}

export function FvImage({ className, disabledClassName, src, alt }: Readonly<FvImageProps>) {
  const { setNotification } = useNotification()
  const [hasFile, setHasFile] = useState(false)
  const { isOnline } = useDetectOnlineStatus()

  useEffect(() => {
    const db = new IndexedDBService('firstVoicesIndexedDb')
    db.hasMediaFile(src).then((exists) => setHasFile(exists))
  }, [isOnline, src])

  const imageAvailable = isOnline || hasFile

  return (
    <>
      {imageAvailable ? (
        <img className={className} src={src} alt={alt} />
      ) : (
        <button
          type="button"
          className={`fv-picture text-20xl text-gray-500/25 ${disabledClassName}`}
          onClick={() => {
            setNotification({
              type: ALERT_TYPES.WARNING,
              message: 'Images are not available offline. Please go online to access this image.',
            })
          }}
        />
      )}
    </>
  )
}

export default FvImage
