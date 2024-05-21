import { Outlet, useLocation } from 'react-router-dom';
import { NavigationItem } from './components/common/data';
import Header from './components/common/header/header';
import MobileNav from './components/common/mobile-nav/mobile-nav';
import { Suspense } from 'react';
import { LoadingSpinner } from './components/common/loading-spinner/loading-spinner';

const navItems: NavigationItem[] = [
  {
    id: 'dictionary',
    label: 'Dictionary',
    to: '/dictionary',
    icon: <i className="fv-dictionary" />,
  },
  {
    id: 'learn',
    label: 'Learn',
    to: '/learn',
    icon: <i className="fv-learning" />,
  },
  {
    id: 'bookmarks',
    label: 'Bookmarks',
    to: '/bookmarks',
    icon: <i className="fv-bookmark" />,
  },
];
const extraNavItems: NavigationItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: <i className="fv-cog" />,
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    icon: <i className="fv-info" />,
  },
];

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
