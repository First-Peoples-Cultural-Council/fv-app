import React, { useState, useEffect, useContext } from 'react';
import {
  matchRoutes,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';

// FPCC
import styles from './dictionary-page.module.css';
import SubNavDesktop from '../sub-nav-desktop/sub-nav-desktop';
import SubNavMobile from '../sub-nav-mobile/sub-nav-mobile';
import WordOfTheDay from './word-of-the-day';
import { dictionarySubNavItems } from '../../constants/navigation';
import SearchInput from '../common/search-input/search-input';
import PageHeader from '../common/page-header/page-header';
import { FvWord } from '../common/data';
import { ApiContext } from '../contexts/apiContext';
import fetchWordsData from '../../services/wordsApiService';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import SearchProvider from '../search-provider';

/* eslint-disable-next-line */
export interface DictionaryProps {}

type ContextType = {
  dictionaryData: FvWord[] | [];
};

export function Dictionary(props: DictionaryProps) {
  const [dictionaryData, setDictionaryData] = useState<FvWord[] | []>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { isApiCallInProgress } = useContext(ApiContext);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData(isApiCallInProgress);
        setDictionaryData(result.data);
        setLoading(false);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, [isApiCallInProgress]);

  const currentNavItem =
    dictionarySubNavItems.find((item) =>
      matchRoutes(
        [{ path: item.path }, ...(item?.activePathMatches ?? [])],
        location
      )
    ) ?? dictionarySubNavItems[0];

  return loading ? (
    <LoadingSpinner />
  ) : (
    <SearchProvider>
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
          <Outlet context={{ dictionaryData } satisfies ContextType} />
        </div>

        {dictionaryData?.length > 0 && (
          <WordOfTheDay dictionaryData={dictionaryData} />
        )}
      </div>
    </SearchProvider>
  );
}

export default Dictionary;

export function useDictionaryData() {
  return useOutletContext<ContextType>();
}
