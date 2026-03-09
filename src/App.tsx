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
import { NotificationBanner } from 'components/common/notification-banner/notification-banner'
import { AudioProvider } from 'components/contexts/audioContext'

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InstallPromptProvider>
        <NotificationProvider>
          <AudioProvider>
            <NotificationBanner />
            <Header navItems={navItems} extraNavItems={extraNavItems} />
            <Outlet />
            <InstallPrompt />
            <MobileNav navItems={navItems} extraNavItems={extraNavItems} />
          </AudioProvider>
        </NotificationProvider>
      </InstallPromptProvider>
    </Suspense>
  )
}

export default App
