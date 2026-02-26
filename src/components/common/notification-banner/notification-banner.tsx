import { useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'

import { useNotification } from 'components/contexts/notificationContext'
import { AlertBanner } from 'components/common/alert-banner/alert-banner'

export function NotificationBanner() {
  const { notification, setNotification } = useNotification()

  const panelClasses =
    'pointer-events-auto w-full max-w-xl transform transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in'

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null)
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [notification])

  const handleClose = () => setNotification(null)

  if (!notification) return null

  return (
    <Dialog open={!!notification} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex items-end justify-center p-4 pointer-events-none">
        <DialogPanel transition className={panelClasses}>
          <AlertBanner alertType={notification.type} message={notification.message} handleClose={handleClose} />
        </DialogPanel>
      </div>
    </Dialog>
  )
}
