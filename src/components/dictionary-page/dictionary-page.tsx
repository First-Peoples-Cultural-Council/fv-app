import React from 'react';
import { matchRoutes, Outlet, useLocation } from 'react-router-dom';

// FPCC
import styles from './dictionary-page.module.css';
import SubNavDesktop from '../sub-nav-desktop/sub-nav-desktop';
import SubNavMobile from '../sub-nav-mobile/sub-nav-mobile';
import WordOfTheDay from './word-of-the-day';
import { dictionarySubNavItems } from '../../constants/navigation';
import SearchInput from '../common/search-input/search-input';
import PageHeader from '../common/page-header/page-header';

/* eslint-disable-next-line */
export interface DictionaryProps {}

export function Dictionary(props: DictionaryProps) {
  const location = useLocation();

  const currentNavItem =
    dictionarySubNavItems.find((item) =>
      matchRoutes(
        [{ path: item.path }, ...(item?.activePathMatches ?? [])],
        location
      )
    ) ?? dictionarySubNavItems[0];

  if (!currentNavItem) return null;
  return (
    <div className={styles['container']}>
      <SubNavMobile navItems={dictionarySubNavItems} />
      <PageHeader
        title={currentNavItem.title}
        backgroundColors={{
          to: currentNavItem.colors.to,
          from: currentNavItem.colors.from,
        }}
      >
        {!!matchRoutes([{ path: '' }, { path: 'dictionary' }], location) && (
          <SearchInput />
        )}
      </PageHeader>

      <div className="flex w-full">
        <SubNavDesktop navItems={dictionarySubNavItems} />
        <Outlet />
      </div>

      <WordOfTheDay />
    </div>
  );
}

export default Dictionary;
