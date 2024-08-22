import { ReactNode, createContext, useCallback, useMemo, useState } from 'react'
import { DictionaryEntryExportFormat, sortResults, Result, MTDSearch } from '@mothertongues/search'

// FPCC
import { FvWord } from '../common/data'

type SearchContextType = {
  searchResults: FvWord[] | null
  submitSearch: (query: string | null) => void
  clearSearch: () => void
} | null

export const SearchContext = createContext<SearchContextType>(null)

export interface SearchProviderProps {
  dictionaryHash: {
    [key: string]: DictionaryEntryExportFormat
  }
  searchers: MTDSearch[]
  children: ReactNode
}

export const SearchProvider = ({ dictionaryHash, searchers, children }: SearchProviderProps) => {
  const [searchResults, setSearchResults] = useState<FvWord[] | null>(null)

  const l1Search: MTDSearch = searchers[0]
  const l2Search: MTDSearch = searchers[1]

  const submitSearch = useCallback(
    (query: string | null) => {
      if (query === '' || query === null) {
        setSearchResults(null)
      } else if (l1Search && l2Search) {
        // Search Results in target language
        const l1Results = l1Search.search(query)
        // Search Results in English
        const l2Results = l2Search.search(query, 0)
        // Combine the Results and sort them first by edit distance,
        // then by their Okapi BM25 score
        const allResults = sortResults(l1Results.concat(l2Results))
        // Returns a list of results (Result[]) where each Result contains:
        //  - The edit distance (int)
        //  - The entry ID (UUID)
        //  - An array of locations the match occurs in. ([string, int][])
        //    Each match location contains the field the match occurs in (e.g. 'word') and an index (int) referring to the specific word that is matched (after splitting on whitespace).
        //    For example if the query was the word "test" and there was an entry {"word": "test blah blah", "definition": "this is a test", ...}, then the following match locations would be returned: [['word', 0], ['definition', [3]]]
        //    This will be helpful for highlighting which word/field is matched.
        //  - The Okapi BM25 Score (float)
        //
        // NB: Concatting language and English result  does not currently merge multiple results for the same entry.
        // If an entry appears in both l1results and l2results the duplicate will be present in allResults
        // e.g. [0, "1225d49a-fcc5-43aa-9c48-624e9669e9f6", [["definition", 1]], 6.5720948717988295] from l2 and
        //      [0, "1225d49a-fcc5-43aa-9c48-624e9669e9f6", [["word", 1]], 2.513351938650088] from l1
        // Future ticket: FW-5909 Merge duplicates
        const entries = allResults.map((result: Result) => {
          return {
            ...dictionaryHash?.[result[1]],
            key: `${result[2][0][0]}-${result[1]}`, // Adding unique key for rendering list in React
            locations: result[2],
          }
        })

        //   No results returns an empty array indicating to consumers of "searchResults" that there are no reults for that search
        setSearchResults(entries)
      }
    },
    [dictionaryHash, l1Search, l2Search]
  )

  const searchContext = useMemo(() => {
    return {
      searchResults,
      submitSearch,
      clearSearch: () => setSearchResults(null),
    }
  }, [searchResults, submitSearch])

  return (
    <SearchContext.Provider value={searchContext as unknown as SearchContextType}>{children}</SearchContext.Provider>
  )
}

export default SearchProvider
