import { matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubNavDesktop from '../sub-nav-desktop/sub-nav-desktop';
import SubNavMobile from '../sub-nav-mobile/sub-nav-mobile';
import { SubNavItem } from '../common/data';
import SearchHeader from '../common/search-header/search-header';
import {
  SearchResultsProvider,
  SearchResultsType,
} from '../search-results-provider';

const navItems: SubNavItem[] = [
  {
    id: 'stories',
    path: 'stories',
    icon: 'fv-stories',
    iconSize: 'text-3xl',
    title: 'Stories',
    colors: {
      to: 'to-color-stories-light',
      from: 'from-color-stories-dark',
      hoverText: 'hover:text-color-stories-dark',
      activeText: 'text-color-stories-dark',
      border: 'border-color-stories-dark',
    },
    activePathMatches: [{ path: 'learn/stories' }],
  },
  {
    id: 'songs',
    path: 'songs',
    icon: 'fv-songs',
    iconSize: 'text-4xl',
    title: 'Songs',
    colors: {
      to: 'to-color-songs-light',
      from: 'from-color-songs-dark',
      hoverText: 'hover:text-color-songs-dark',
      activeText: 'text-color-songs-dark',
      border: 'border-color-songs-dark',
    },
    activePathMatches: [{ path: 'learn/songs' }],
  },
  {
    id: 'flashcards',
    path: 'flashcards',
    icon: 'fv-flashcard',
    iconSize: 'text-4xl',
    title: 'Flashcards',
    colors: {
      to: 'to-color-flashcards-light',
      from: 'from-color-flashcards-dark',
      hoverText: 'hover:text-color-flashcards-dark',
      activeText: 'text-color-flashcards-dark',
      border: 'border-color-flashcards-dark',
    },
    activePathMatches: [{ path: 'learn/flashcards' }],
  },
];

/* eslint-disable-next-line */
export interface LearnViewProps {}

export function LearnView(props: LearnViewProps) {
  const location = useLocation();

  const [currentNavItem, setCurrentNavItem] = useState(navItems[0]);
  const [searchResults, setSearchResults] = useState<{
    rawSearchQuery: string;
    entries: SearchResultsType;
  } | null>(null);

  useEffect(() => {
    const currentNavItem = navItems.find((item) =>
      matchRoutes([{ path: `/learn/${item.path}` }], location)
    );
    if (currentNavItem) {
      setCurrentNavItem(currentNavItem);
    }
  }, [location]);

  return (
    <div>
      {currentNavItem && (
        <SearchHeader
          searchMatchRef={null}
          title={currentNavItem.title}
          backgroundColors={{
            to: currentNavItem.colors.to,
            from: currentNavItem.colors.from,
          }}
          setSearchEntries={setSearchResults}
        />
      )}
      <SearchResultsProvider
        results={
          searchResults as {
            rawSearchQuery: string;
            entries: SearchResultsType;
          }
        }
      >
        <SubNavMobile navItems={navItems} />
        <div className="flex w-full">
          <SubNavDesktop navItems={navItems} />
          {currentNavItem && <Outlet />}
        </div>
      </SearchResultsProvider>
    </div>
  );
}

export default LearnView;
