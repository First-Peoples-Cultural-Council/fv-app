// FPCC
import { ALERT_TYPES } from 'constants/notification-types'
import { useDetectOnlineStatus } from 'util/useDetectOnlineStatus'
import { useNotification } from 'components/contexts/notificationContext'

export interface FvImageProps {
  className?: string
  disabledClassName?: string
  src: string
  alt: string
}

export function FvImage({ className, disabledClassName, src, alt }: Readonly<FvImageProps>) {
  const { setNotification } = useNotification()
  const { isOnline } = useDetectOnlineStatus()

  return (
    <>
      {isOnline ? (
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
