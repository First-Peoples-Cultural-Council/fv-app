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
    id: 'profile',
    label: 'Profile',
    to: '/profile',
    icon: <i className="fv-user" />,
  },
];

export function App() {
  return (
    <div className="max-h-[100vh] overflow-hidden">
      <Header navItems={navItems} />
      <Outlet />
      <MobileNav navItems={navItems} />
    </div>
  );
}

export default App;
