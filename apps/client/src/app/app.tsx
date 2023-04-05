import { Header, MobileNav, NavigationItem } from '@fv-app/common-components';
import { Outlet } from 'react-router-dom';

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
    to: '/learn',
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
  return (
    <div>
      <Header navItems={navItems} />
      <Outlet />
      <MobileNav navItems={navItems} />
    </div>
  );
}

export default App;
