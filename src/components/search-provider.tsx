import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useEffect,
  Dispatch,
} from 'react';
import {
  constructSearchers,
  DictionaryEntryExportFormat,
  MTDSearch,
} from '@mothertongues/search';
import { fetchWordsData } from '../services/wordsApiService';

type SearchContextType = {
  searchers: MTDSearch[];
  entriesHash: { [p: string]: DictionaryEntryExportFormat };
  allResults: DictionaryEntryExportFormat[];
  updateAllResults: (newResults: DictionaryEntryExportFormat[]) => void;
  setDataType: Dispatch<any>;
} | null;

const getSearch = async () => {
  const wordsData = await fetchWordsData();
  return constructSearchers(wordsData);
};

const getSearchHash = async () => {
  // The endpoint just returns a list
  // But to quickly fetch items in the local data, we create a hash
  // with the entry IDs. Not sure if you'll want to create the hash here
  // or somewhere else, but I'll just leave it here for now.
  const wordsData = await fetchWordsData();
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
  const [dataType, setDataType] = useState<string>('words');
  const [searchValue, setSearchValue] = useState<SearchContextType>(null);

  useEffect(() => {
    getSearchHash().then((hash) => {
      setEntriesHash(hash);
    });
  }, []);

  const updateAllResults = (newResults: DictionaryEntryExportFormat[]) => {
    setAllResults(newResults);
  };

  const getSearchValue = async () => {
    const searchers = await getSearch();
    return {
      searchers,
      entriesHash: entriesHash,
      allResults: allResults,
      updateAllResults: updateAllResults,
      setDataType: setDataType,
    };
  };

  useEffect(() => {
    if (getSearchValue) {
      getSearchValue().then((value) => {
        setSearchValue(value);
      });
    }
  }, [getSearchValue]);

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
