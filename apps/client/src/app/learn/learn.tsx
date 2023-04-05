import styles from './learn.module.css';
import { SubNavItem, SearchHeader } from '@fv-app/common-components';
import { matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubNavDesktop from '../sub-nav-desktop/sub-nav-desktop';
import SubNavMobile from '../sub-nav-mobile/sub-nav-mobile';

const navItems: SubNavItem[] = [
  {
    id: 'stories',
    path: 'stories',
    icon: 'fv-alphabet',
    title: 'Stories',
    colors: {
      to: 'to-color-alphabet-light',
      from: 'from-color-alphabet-dark',
      hoverText: 'hover:text-color-alphabet-dark',
      activeText: 'text-color-alphabet-dark',
      border: 'border-color-alphabet-dark',
    },
  },
  {
    id: 'songs',
    path: 'songs',
    icon: 'fv-words',
    title: 'Songs',
    colors: {
      to: 'to-color-words-light',
      from: 'from-color-words-dark',
      hoverText: 'hover:text-color-words-dark',
      activeText: 'text-color-words-dark',
      border: 'border-color-words-dark',
    },
  },
  {
    id: 'flashcards',
    path: 'flashcards',
    icon: 'fv-categories',
    title: 'Flashcards',
    colors: {
      to: 'to-color-categories-light',
      from: 'from-color-categories-dark',
      hoverText: 'hover:text-color-categories-dark',
      activeText: 'text-color-categories-dark',
      border: 'border-color-categories-dark',
    },
    activePathMatches: [{ path: 'stories' }],
  },
];

/* eslint-disable-next-line */
export interface LearnViewProps {}

export function LearnView(props: LearnViewProps) {
  const location = useLocation();
  const [currentNavItem, setCurrentNavItem] = useState(
    navItems.find((item) =>
      matchRoutes(
        [{ path: item.path }, ...(item?.activePathMatches || [])],
        location
      )
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
      <SubNavMobile navItems={navItems} />
      <div className="flex w-full">
        <SubNavDesktop navItems={navItems} />
        <Outlet />
      </div>
    </div>
  );
}

export default LearnView;
