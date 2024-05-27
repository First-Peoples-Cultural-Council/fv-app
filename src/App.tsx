import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// FPCC
import Header from './components/common/header/header';
import MobileNav from './components/common/mobile-nav/mobile-nav';
import { LoadingSpinner } from './components/common/loading-spinner/loading-spinner';
import { navItems, extraNavItems } from './constants/navigation';

export function App() {
  let currentTab = 'dictionary';
  const location = useLocation();
  switch (location.pathname) {
    case '/learn':
    case '/learn/stories':
    case '/learn/songs':
    case '/learn/flashcards':
      currentTab = 'learn';
      break;

    case '/bookmarks':
      currentTab = 'bookmarks';
      break;

    case '/settings':
      currentTab = 'settings';
      break;

    case '/about':
      currentTab = 'about';
      break;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header navItems={navItems} extraNavItems={extraNavItems} />
      <Outlet />
      <MobileNav
        navItems={navItems}
        extraNavItems={extraNavItems}
        currentTab={currentTab}
      />
    </Suspense>
  );
}

export default App;
