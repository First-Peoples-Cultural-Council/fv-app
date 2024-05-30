import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { sortResults, Result, MTDSearch } from '@mothertongues/search';

// FPCC
import { SearchContext } from '../../search-provider';

/* eslint-disable-next-line */
export interface SearchInputProps {}

export function SearchInput(props: Readonly<SearchInputProps>) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [l1Search, setL1Search] = useState<MTDSearch>();
  const [l2Search, setL2Search] = useState<MTDSearch>();
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    if (searchContext) {
      setL1Search(searchContext.searchers[0]);
      setL2Search(searchContext.searchers[1]);
    }
  }, [searchContext]);

  const getResults = (rawSearchQuery: string) => {
    if (l1Search && l2Search && searchContext) {
      // @ts-ignore
      // Search Results in target language
      const l1Results = l1Search.search(rawSearchQuery);
      // Search Results in English
      const l2Results = l2Search.search(rawSearchQuery, 0);
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
          entry: searchContext.entriesHash[result[1]],
          locations: result[2],
        };
      });

      searchContext.updateAllResults(entries);
    }
  };

  const onSearchInputChange = (event: ChangeEvent<any>) => {
    setSearchValue(event?.target?.value);
  };

  const clearSearch = () => {
    setSearchValue('');
    if (searchContext) searchContext.updateAllResults([]);
  };

  const submitSearch = (query: string) => {
    if (query?.length > 0) {
      getResults(query);
    } else {
      clearSearch();
    }
  };

  const onKeyUp = (event: any) => {
    if (event?.keyCode === 13 || event?.key === 'Enter') {
      submitSearch(event?.target?.value);
    }
  };

  const clickSearch = () => {
    submitSearch(searchValue);
  };

  return (
    <div className="flex items-center w-full max-w-md group relative">
      <input
        value={searchValue}
        onChange={onSearchInputChange}
        onKeyUp={onKeyUp}
        placeholder="Search"
        className="p-2 rounded-l-lg h-7 border border-gray-400 w-full shadow-inner"
      />
      <button
        onClick={clearSearch}
        className="opacity-0 group-hover:opacity-100 absolute right-12 top-1/2 transform -translate-y-1/2 text-xs cursor-pointer transition-opacity duration-200 ease-in-out"
      >
        <i className="fv-close text-gray-500" />
      </button>
      <button
        onClick={clickSearch}
        className="p-2 h-7 rounded-r-lg bg-white border border-gray-400 border-l-0 flex items-center"
      >
        <i className="fv-search text-text-gray" />
      </button>
    </div>
  );
}

export default SearchInput;
