import { ReactNode, createContext, useMemo } from 'react';
import { mtdData } from './temp-mtd-export-data';
import {
  constructSearchers,
  DictionaryEntryExportFormat,
} from '@mothertongues/search';

const getSearch = () => {
  return constructSearchers(mtdData);
};
const getSearchHash = () => {
  // The endpoint just returns a list
  // But to quickly fetch items in the local data, we create a hash
  // with the entry IDs. Not sure if you'll want to create the hash here
  // or somewhere else, but I'll just leave it here for now.
  const entriesHash: { [key: string]: DictionaryEntryExportFormat } = {};
  mtdData.data.forEach((entry) => {
    entriesHash[entry.entryID] = entry;
  });
  return entriesHash;
};
export const SearchContext = createContext({
  searchers: getSearch(),
  entriesHash: getSearchHash(),
});

export interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const searchValue = useMemo(() => {
    return {
      searchers: getSearch(),
      entriesHash: getSearchHash(),
    };
  }, []);

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
