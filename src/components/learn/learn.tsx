import { matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubNavDesktop from '../sub-nav-desktop/sub-nav-desktop';
import SubNavMobile from '../sub-nav-mobile/sub-nav-mobile';
import { SubNavItem } from '../common/data';
import SearchHeader from '../common/search-header/search-header';
import fetchStoriesData from '../../services/storiesApiService';
import fetchSongsData from '../../services/songsApiService';
import {
  SearchResultsProvider,
  SearchResultsType,
} from '../search-results-provider';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';

const navItems: SubNavItem[] = [];

const storiesNavItem: SubNavItem = {
  id: 'stories',
  path: 'stories',
  icon: 'fv-stories',
  iconSize: 'text-3xl',
  title: 'Stories',
  colors: {
    to: 'to-color-alphabet-light',
    from: 'from-color-alphabet-dark',
    hoverText: 'hover:text-color-alphabet-dark',
    activeText: 'text-color-alphabet-dark',
    border: 'border-color-alphabet-dark',
  },
};

const songsNavItem: SubNavItem = {
  id: 'songs',
  path: 'songs',
  icon: 'fv-songs',
  iconSize: 'text-4xl',
  title: 'Songs',
  colors: {
    to: 'to-color-words-light',
    from: 'from-color-words-dark',
    hoverText: 'hover:text-color-words-dark',
    activeText: 'text-color-words-dark',
    border: 'border-color-words-dark',
  },
};

const flashCardsNavItem: SubNavItem = {
  id: 'flashcards',
  path: 'flashcards',
  icon: 'fv-flashcard',
  iconSize: 'text-4xl',
  title: 'Flashcards',
  colors: {
    to: 'to-color-categories-light',
    from: 'from-color-categories-dark',
    hoverText: 'hover:text-color-categories-dark',
    activeText: 'text-color-categories-dark',
    border: 'border-color-categories-dark',
  },
};

/* eslint-disable-next-line */
export interface LearnViewProps {}

export function LearnView(props: LearnViewProps) {
  const location = useLocation();

  const [currentNavItem, setCurrentNavItem] = useState(navItems[0]);
  const [navItemsLoaded, setNavItemsLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    rawSearchQuery: string;
    entries: SearchResultsType;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        if (!navItems.includes(storiesNavItem)) {
          navItems.push(storiesNavItem);
        }

        if (!navItems.includes(songsNavItem)) {
          navItems.push(songsNavItem);
        }

        if (!navItems.includes(flashCardsNavItem)) {
          navItems.push(flashCardsNavItem);
        }
        setLoading(false);
      } catch (error) {
        // Handle error scenarios
        throw error;
      }
    };

    fetchDataAsync()
      .then(() => {
        setNavItemsLoaded(true);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, []);

  useEffect(() => {
    setCurrentNavItem(
      navItems.find((item) =>
        matchRoutes(
          [{ path: item.path }, ...(item?.activePathMatches ?? [])],
          location
        )
      ) ?? navItems[0]
    );
  }, [navItemsLoaded, location]);

  useEffect(() => {
    const currentNavItem = navItems.find((item) => {
      return matchRoutes([{ path: item.path }], location);
    });
    if (currentNavItem) {
      setCurrentNavItem(currentNavItem);
    }
  }, [location]);

  return (
    <div>
      {loading && <LoadingSpinner />}
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
