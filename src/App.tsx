import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// FPCC
import Header from './components/common/header/header';
import MobileNav from './components/common/mobile-nav/mobile-nav';
import { LoadingSpinner } from './components/common/loading-spinner/loading-spinner';
import { navItems, extraNavItems } from './constants/navigation';

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header navItems={navItems} extraNavItems={extraNavItems} />
      <Outlet />
      <MobileNav navItems={navItems} extraNavItems={extraNavItems} />
    </Suspense>
  );
}

export default App;
