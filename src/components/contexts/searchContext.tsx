import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  DictionaryEntryExportFormat,
  sortResults,
  Result,
  MTDSearch,
} from '@mothertongues/search';

// FPCC
import { FvWordLocationCombo } from '../common/data';

type SearchContextType = {
  searchResults: FvWordLocationCombo[] | null;
  submitSearch: (query: string | null) => void;
  clearSearch: () => void;
} | null;

export const SearchContext = createContext<SearchContextType>(null);

export interface SearchProviderProps {
  dictionaryHash: {
    [key: string]: DictionaryEntryExportFormat;
  };
  searchers: MTDSearch[];
  children: ReactNode;
}

export const SearchProvider = ({
  dictionaryHash,
  searchers,
  children,
}: SearchProviderProps) => {
  const [searchResults, setSearchResults] = useState<
    FvWordLocationCombo[] | null
  >(null);

  const l1Search: MTDSearch = searchers[0];
  const l2Search: MTDSearch = searchers[1];

  const submitSearch = useCallback(
    (query: string | null) => {
      if (query === '' || query === null) {
        setSearchResults(null);
      } else if (l1Search && l2Search) {
        // @ts-ignore
        // Search Results in target language
        const l1Results = l1Search.search(query);
        // Search Results in English
        const l2Results = l2Search.search(query, 0);
        // Combine the Results and sort them first by edit distance,
        // then by their Okapi BM25 score
        const allResults = sortResults(l1Results.concat(l2Results));
        // Returns a list of results (Result[]) where each Result contains:
        //  - The edit distance (int)
        //  - The entry ID (UUID)
        //  - An array of locations the match occurs in. ([string, int][])
        //    Each match location contains the field the match occurs in (e.g. 'word') and an index (int) referring to the specific word that is matched (after splitting on whitespace).
        //    For example if the query was the word "test" and there was an entry {"word": "test blah blah", "definition": "this is a test", ...}, then the following match locations would be returned: [['word', 0], ['definition', [3]]]
        //    This will be helpful for highlighting which word/field is matched.
        //  - The Okapi BM25 Score (float)
        const entries = allResults.map((result: Result) => {
          return {
            entry: dictionaryHash?.[result[1]],
            locations: result[2],
          };
        });
        //   No results returns an empty array indicating to consumers of "allResults" that there are no reults for that search
        setSearchResults(entries);
      }
    },
    [dictionaryHash, l1Search, l2Search]
  );

  const searchContext = useMemo(() => {
    return {
      searchResults,
      submitSearch,
      clearSearch: () => setSearchResults(null),
    };
  }, [searchResults, submitSearch]);

  return (
    <SearchContext.Provider
      value={searchContext as unknown as SearchContextType}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
