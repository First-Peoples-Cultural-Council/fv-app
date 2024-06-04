import { useState } from 'react';
import { matchRoutes, Outlet, useLocation } from 'react-router-dom';

// FPCC
import styles from './dictionary-page.module.css';
import SubNavDesktop from '../sub-nav-desktop/sub-nav-desktop';
import SubNavMobile from '../sub-nav-mobile/sub-nav-mobile';
import SearchHeader from '../common/search-header/search-header';
import WordOfTheDay from './word-of-the-day';
import {
  SearchResultsProvider,
  SearchResultsType,
} from '../search-results-provider';
import { dictionarySubNavItems } from '../../constants/navigation';

/* eslint-disable-next-line */
export interface DictionaryProps {}

export function Dictionary(props: DictionaryProps) {
  const [searchMatchRef, setSearchMatchRef] = useState<HTMLDivElement | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<{
    rawSearchQuery: string;
    entries: SearchResultsType;
  } | null>(null);
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
      <SearchHeader
        searchMatchRef={searchMatchRef}
        title={currentNavItem.title}
        backgroundColors={{
          to: currentNavItem.colors.to,
          from: currentNavItem.colors.from,
        }}
        setSearchEntries={setSearchResults}
        shouldShowSearch={
          !!matchRoutes([{ path: '' }, { path: 'dictionary' }], location)
        }
      />
      <SearchResultsProvider
        results={
          searchResults as {
            rawSearchQuery: string;
            entries: SearchResultsType;
          }
        }
      >
        <div className="flex w-full">
          <SubNavDesktop navItems={dictionarySubNavItems} />
          <Outlet context={{ setSearchMatchRef }} />
        </div>
      </SearchResultsProvider>
    </div>
  );
}

export default Dictionary;
