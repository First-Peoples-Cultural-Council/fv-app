import React, { useState, useEffect, useContext } from 'react';
import {
  matchRoutes,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import { DictionaryEntryExportFormat } from '@mothertongues/search';

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
  dictionaryHash: {
    [key: string]: DictionaryEntryExportFormat;
  };
};

export function Dictionary(props: DictionaryProps) {
  const [dictionaryData, setDictionaryData] = useState<FvWord[] | []>([]);
  const [dictionaryHash, setDictionaryHash] = useState<{
    [key: string]: DictionaryEntryExportFormat;
  }>({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { isApiCallInProgress } = useContext(ApiContext);

  const getDictionaryHash = (dictionaryData: FvWord[] | []) => {
    // The endpoint just returns a list
    // But to quickly fetch items in the local data, we create a hash
    // with the entry IDs. Not sure if you'll want to create the hash here
    // or somewhere else, but I'll just leave it here for now.
    const entriesHash: { [key: string]: DictionaryEntryExportFormat } = {};
    dictionaryData.forEach((entry) => {
      entriesHash[entry.entryID] = entry;
    });
    return entriesHash;
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData(isApiCallInProgress);
        const dictionaryHash = getDictionaryHash(result.data);
        setDictionaryData(result.data);
        setDictionaryHash(dictionaryHash);
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
            <SearchInput dictionaryHash={dictionaryHash} />
          )}
        </PageHeader>

        <div className="flex w-full">
          <SubNavDesktop navItems={dictionarySubNavItems} />
          <Outlet
            context={{ dictionaryData, dictionaryHash } satisfies ContextType}
          />
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
