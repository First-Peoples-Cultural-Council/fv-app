import { useNotification } from 'components/contexts/notificationContext'
import { ALERT_TYPES } from 'constants/notification-types'
import { useCallback } from 'react'
import { useDetectOnlineStatus } from './useDetectOnlineStatus'

export const ConnectionMonitor = () => {
  const { setNotification } = useNotification()

  const handleReconnect = useCallback(() => {
    setNotification({
      type: ALERT_TYPES.INFO,
      message: 'Connection restored. Loading media.',
    })
  }, [setNotification])

  useDetectOnlineStatus(handleReconnect)

  return null
}
