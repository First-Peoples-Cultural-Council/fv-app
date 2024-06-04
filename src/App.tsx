import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// FPCC
import Header from './components/common/header/header';
import MobileNav from './components/common/mobile-nav/mobile-nav';
import { LoadingSpinner } from './components/common/loading-spinner/loading-spinner';
import { navItems, extraNavItems } from './constants/navigation';
import InstallPrompt from './components/common/install-prompt/install-prompt';
import useSiteTitleFromManifest from './components/common/hooks/useSiteTitleFromManifest';

export function App() {
  const hostnameParts = window.location.hostname.split('.');
  const subdomain = hostnameParts.length > 2 ? hostnameParts[0] : 'default';
  const manifestUrl = `${process.env.PUBLIC_URL}/manifest.${subdomain}.json`;
  const siteTitle = useSiteTitleFromManifest(manifestUrl);

  const logoURL = `${process.env.PUBLIC_URL}/${subdomain}/logo192.png`;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header navItems={navItems} extraNavItems={extraNavItems} />
      <Outlet />
      <InstallPrompt siteTitle={siteTitle} siteURL={"https://www.firstvoices.com/" + subdomain + "/"} logoURL={logoURL} />
      <MobileNav navItems={navItems} extraNavItems={extraNavItems} />
    </Suspense>
  );
}

export default App;
