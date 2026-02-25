import { useContext, createContext, useState, useMemo, ReactNode } from 'react'

import { ALERT_TYPES } from 'constants/notification-types'

type Notification = {
  message: string
  type: keyof typeof ALERT_TYPES
} | null

interface NotificationContextType {
  notification: Notification
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotification() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useNotification must be used within a Notification Provider.')
  }

  return context
}

export interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: Readonly<NotificationProviderProps>) {
  const [notification, setNotification] = useState<Notification>(null)

  // Only change the value object if notification changes
  const value = useMemo(() => ({ notification, setNotification }), [notification])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
