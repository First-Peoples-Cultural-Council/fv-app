import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
  MutableRefObject,
} from 'react';
import {
  constructSearchers,
  DictionaryEntryExportFormat,
  MTDSearch,
} from '@mothertongues/search';
import { fetchWordsData } from '../services/wordsApiService';
import { FvWordLocationCombo } from './common/data';
import { ApiContext } from './contexts/apiContext';

type SearchContextType = {
  searchers: MTDSearch[];
  entriesHash: { [p: string]: DictionaryEntryExportFormat };
  allResults: DictionaryEntryExportFormat[];
  updateAllResults: (newResults: FvWordLocationCombo[]) => void;
} | null;

const getSearch = async (
  isApiCallInProgress: MutableRefObject<boolean> | null
) => {
  const wordsData = await fetchWordsData(isApiCallInProgress);
  return constructSearchers(wordsData);
};

const getSearchHash = async (
  isApiCallInProgress: MutableRefObject<boolean> | null
) => {
  // The endpoint just returns a list
  // But to quickly fetch items in the local data, we create a hash
  // with the entry IDs. Not sure if you'll want to create the hash here
  // or somewhere else, but I'll just leave it here for now.
  const wordsData = await fetchWordsData(isApiCallInProgress);
  const entriesHash: { [key: string]: DictionaryEntryExportFormat } = {};
  wordsData.data.forEach((entry) => {
    entriesHash[entry.entryID] = entry;
  });
  return entriesHash;
};

export const SearchContext = createContext<SearchContextType>(null);

export interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [allResults, setAllResults] = useState<DictionaryEntryExportFormat[]>(
    []
  );
  const [entriesHash, setEntriesHash] = useState<{
    [key: string]: DictionaryEntryExportFormat;
  }>({});
  const [searchValue, setSearchValue] = useState<SearchContextType>(null);

  const { isApiCallInProgress } = useContext(ApiContext);

  useEffect(() => {
    getSearchHash(isApiCallInProgress).then((hash) => {
      setEntriesHash(hash);
    });
  }, [isApiCallInProgress]);

  const updateAllResults = (newResults: DictionaryEntryExportFormat[]) => {
    setAllResults(newResults);
  };

  useEffect(() => {
    const getSearchValue = async () => {
      const searchers = await getSearch(isApiCallInProgress);
      return {
        searchers,
        entriesHash: entriesHash,
        allResults: allResults,
        updateAllResults: updateAllResults,
      };
    };

    getSearchValue().then((value) => {
      setSearchValue(value as unknown as SearchContextType);
    });
  }, [allResults, entriesHash, isApiCallInProgress]);

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
