import { Outlet, useLocation } from 'react-router-dom';
import { NavigationItem } from './components/common/data';
import Header from './components/common/header/header';
import MobileNav from './components/common/mobile-nav/mobile-nav';

const navItems: NavigationItem[] = [
  {
    id: 'dictionary',
    label: 'Dictionary',
    to: '/alphabet',
    icon: <i className="fv-book" />,
  },
  {
    id: 'learn',
    label: 'Learn',
    to: '/stories',
    icon: <i className="fv-computer" />,
  },
  {
    id: 'profile',
    label: 'Profile',
    to: '/profile',
    icon: <i className="fv-user" />,
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
    case '/stories':
    case '/songs':
    case '/flashcards':
      currentTab = 'learn';
      break;

    case '/profile':
      currentTab = 'profile';
      break;

    case '/settings':
      currentTab = 'settings';
      break;

    case '/about':
      currentTab = 'about';
      break;
  }

  return (
    <div>
      <Header navItems={navItems} extraNavItems={extraNavItems} currentTab={currentTab} />
      <Outlet />
      <MobileNav navItems={navItems} extraNavItems={extraNavItems} currentTab={currentTab} />
    </div>
  );
}

export default App;
