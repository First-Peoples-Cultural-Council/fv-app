import { Suspense } from 'react'
import { Outlet } from 'react-router'

// FPCC
import Header from 'components/common/header/header'
import MobileNav from 'components/common/mobile-nav/mobile-nav'
import { LoadingSpinner } from 'components/common/loading-spinner/loading-spinner'
import { navItems, extraNavItems } from 'constants/navigation'
import InstallPrompt from 'components/install-prompt/install-prompt'
import { InstallPromptProvider } from 'components/contexts/installPromptContext'
import { NotificationProvider } from 'components/contexts/notificationContext'
import { Notification } from 'components/common/notification/notification'

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InstallPromptProvider>
        <NotificationProvider>
          <Notification />
          <Header navItems={navItems} extraNavItems={extraNavItems} />
          <Outlet />
          <InstallPrompt />
          <MobileNav navItems={navItems} extraNavItems={extraNavItems} />
        </NotificationProvider>
      </InstallPromptProvider>
    </Suspense>
  )
}

export default App
