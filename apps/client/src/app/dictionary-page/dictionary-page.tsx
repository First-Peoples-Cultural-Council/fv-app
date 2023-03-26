import styles from './dictionary-page.module.css';
import { DictionaryNavItem, SearchHeader } from '@fv-app/common-components';
import { matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DictionaryNavDesktop from '../dictionary-nav-desktop/dictionary-nav-desktop';
import DictionaryNavMobile from '../dictionary-nav-mobile/dictionary-nav-mobile';

const navItems: DictionaryNavItem[] = [
  {
    id: 'alphabet',
    path: 'alphabet',
    icon: 'fv-alphabet',
    title: 'Alphabet',
    colors: {
      to: 'to-color-alphabet-light',
      from: 'from-color-alphabet-dark',
      hoverText: 'hover:text-color-alphabet-dark',
      activeText: 'text-color-alphabet-dark',
      border: 'border-color-alphabet-dark',
    },
  },
  {
    id: 'dictionary',
    path: 'dictionary',
    icon: 'fv-words',
    title: 'Dictionary',
    colors: {
      to: 'to-color-words-light',
      from: 'from-color-words-dark',
      hoverText: 'hover:text-color-words-dark',
      activeText: 'text-color-words-dark',
      border: 'border-color-words-dark',
    },
  },
  {
    id: 'categories',
    path: 'categories',
    icon: 'fv-categories',
    title: 'Categories',
    colors: {
      to: 'to-color-categories-light',
      from: 'from-color-categories-dark',
      hoverText: 'hover:text-color-categories-dark',
      activeText: 'text-color-categories-dark',
      border: 'border-color-categories-dark',
    },
  },
];

/* eslint-disable-next-line */
export interface DictionaryProps {}

export function Dictionary(props: DictionaryProps) {
  const location = useLocation();
  const [currentNavItem, setCurrentNavItem] = useState(
    navItems.find((item) =>
      matchRoutes([{ path: `${item.path}:id` }], location)
    ) || navItems[0]
  );

  useEffect(() => {
    const currentNavItem = navItems.find((item) =>
      matchRoutes([{ path: item.path }], location)
    );
    if (currentNavItem) {
      setCurrentNavItem(currentNavItem);
    }
  }, [location]);

  if (!currentNavItem) return null;
  return (
    <div className={styles['container']}>
      <SearchHeader
        title={currentNavItem.title}
        backgroundColors={{
          to: currentNavItem.colors.to,
          from: currentNavItem.colors.from,
        }}
      />
      <DictionaryNavMobile navItems={navItems} />
      <div className="flex w-full">
        <DictionaryNavDesktop navItems={navItems} />
        <Outlet />
      </div>
    </div>
  );
}

export default Dictionary;
