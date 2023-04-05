import { Header, MobileNav, NavigationItem } from '@fv-app/common-components';
import { Outlet, useLocation } from 'react-router-dom';

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
  {
    id: 'misc',
    label: 'Misc',
    to: '/settings',
    icon: <i className="fv-menu" />,
  },
];

export function App() {
  let currentTab = 'dictionary';
  const location = useLocation();
  switch (location.pathname) {
    case '/alphabet':
    case '/dictionary':
    case '/categories':
      currentTab = 'dictionary';
      break;

    case '/stories':
    case '/songs':
    case '/flashcards':
      currentTab = 'learn';
      break;

    case '/profile':
      currentTab = 'profile';
      break;

    case '/settings':
      currentTab = 'misc';
      break;
  }

  return (
    <div className="">
      <Header navItems={navItems} currentTab={currentTab} />
      <Outlet />
      <MobileNav navItems={navItems} currentTab={currentTab} />
    </div>
  );
}

export default App;
