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
  allResults: DictionaryEntryExportFormat[];
  updateAllResults: (newResults: FvWordLocationCombo[]) => void;
} | null;

const getSearch = async (
  isApiCallInProgress: MutableRefObject<boolean> | null
) => {
  const wordsData = await fetchWordsData(isApiCallInProgress);
  return constructSearchers(wordsData);
};

export const SearchContext = createContext<SearchContextType>(null);

export interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [allResults, setAllResults] = useState<DictionaryEntryExportFormat[]>(
    []
  );
  const [searchContext, setSearchContext] = useState<SearchContextType>(null);
  const { isApiCallInProgress } = useContext(ApiContext);

  const updateAllResults = (newResults: DictionaryEntryExportFormat[]) => {
    setAllResults(newResults);
  };

  useEffect(() => {
    const getSearchContext = async () => {
      const searchers = await getSearch(isApiCallInProgress);
      return {
        searchers,
        allResults: allResults,
        updateAllResults: updateAllResults,
      };
    };
    getSearchContext().then((value) => {
      setSearchContext(value as unknown as SearchContextType);
    });
  }, [allResults, isApiCallInProgress]);

  return (
    <SearchContext.Provider value={searchContext}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
