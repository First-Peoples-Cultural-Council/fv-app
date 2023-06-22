import styles from './dictionary-page.module.css';
import { matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubNavDesktop from '../sub-nav-desktop/sub-nav-desktop';
import SubNavMobile from '../sub-nav-mobile/sub-nav-mobile';
import SearchHeader from '../common/search-header/search-header';
import { SubNavItem } from '../common/data';
import WordOfTheDay from './word-of-the-day';

const navItems: SubNavItem[] = [
  {
    id: 'alphabet',
    path: 'alphabet',
    icon: 'fv-alphabet',
    iconSize: 'text-2xl',
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
    iconSize: 'text-2xl',
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
    iconSize: 'text-2xl',
    title: 'Categories',
    colors: {
      to: 'to-color-categories-light',
      from: 'from-color-categories-dark',
      hoverText: 'hover:text-color-categories-dark',
      activeText: 'text-color-categories-dark',
      border: 'border-color-categories-dark',
    },
    activePathMatches: [{ path: 'categories/:id' }],
  },
  {
    id: 'randomized',
    path: 'randomized',
    icon: 'fv-shuffle',
    title: '10 Random Entries',
    colors: {
      to: 'to-color-shuffle-light',
      from: 'from-color-shuffle-dark',
      hoverText: 'hover:text-color-shuffle-dark',
      activeText: 'text-color-shuffle-dark',
      border: 'border-color-shuffle-dark',
    },
  }
];

/* eslint-disable-next-line */
export interface DictionaryProps {}

export function Dictionary(props: DictionaryProps) {
  const location = useLocation();
  const [currentNavItem, setCurrentNavItem] = useState(
    navItems.find((item) =>
      matchRoutes(
        [{ path: item.path }, ...(item?.activePathMatches ?? [])],
        location
      )
    ) ?? navItems[0]
  );
  const today = new Date();

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
      {today.toDateString() !==
        (localStorage.getItem('lastWOTDSeenOn') ?? '') && <WordOfTheDay />}
    </div>
  );
}

export default Dictionary;
