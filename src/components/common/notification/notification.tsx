import { useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'

import { useNotification } from 'components/contexts/notificationContext'
import { AlertBanner } from '../alert-banner/alert-banner'

export function NotificationBanner() {
  const { notification, setNotification } = useNotification()

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null)
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [Notification, setNotification])

  const handleClose = () => {
    if (notification) {
      setNotification(null)
    }
  }

  if (!notification) return null

  return (
    <Dialog open={!!notification} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="min-h-screen p-4 text-center sm:p-0">
          {/* This element is to trick the browser into placing the alert at the bottom. */}
          <span className="inline-block h-[90vh] align-middle" aria-hidden="true">
            &#8203;
          </span>
          <DialogPanel
            transition
            className="relative transform transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:scale-95"
          >
            <div className="max-w-4xl mx-auto">
              <AlertBanner alertType={notification.type} message={notification.message} handleClose={handleClose} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
