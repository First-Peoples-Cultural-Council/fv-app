import SearchInput from '../search-input/search-input';
import { useContext, useState } from 'react';
import { SearchContext } from '../../search-provider';
import { sortResults, Result } from '@mothertongues/search';

export interface SearchHeaderProps {
  searchMatchRef: HTMLDivElement | null;
  title: string;
  backgroundColors: { to: string; from: string };
}

export function SearchHeader({
  searchMatchRef,
  title,
  backgroundColors,
}: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [l1_search, l2_search] = useContext(SearchContext)['searchers'];
  const { entriesHash, updateAllResults } = useContext(SearchContext);

  const getResults = (rawSearchQuery: string) => {
    if (rawSearchQuery.length > 1) {
      // @ts-ignore
      // Search Results in target language
      const l1Results = l1_search.search(rawSearchQuery);
      // Search Results in English
      const l2Results = l2_search.search(rawSearchQuery, 0);
      // Combine the Results and sort them first by edit distance,
      // then by their Okapi BM25 score
      const allResults = sortResults(l1Results.concat(l2Results));
      console.log(`Here are all the results for '${rawSearchQuery}': `);
      console.log(allResults); // Returns a list of results (Result[]) where each Result contains:
      //  - The edit distance (int)
      //  - The entry ID (UUID)
      //  - An array of locations the match occurs in. ([string, int][])
      //    Each match location contains the field the match occurs in (e.g. 'word') and an index (int) referring to the specific word that is matched (after splitting on whitespace).
      //    For example if the query was the word "test" and there was an entry {"word": "test blah blah", "definition": "this is a test", ...}, then the following match locations would be returned: [['word', 0], ['definition', [3]]]
      //    This will be helpful for highlighting which word/field is matched.
      //  - The Okapi BM25 Score (float)

      const entries = allResults.map((result: Result) => entriesHash[result[1]])

      console.log('Here are the entries mapped from the results:');
      console.log(entries);

      updateAllResults(entries);
    }
  };

  return (
    <header
      role="banner"
      className={`sub-header flex py-5 px-4 bg-gradient-to-t ${backgroundColors.from} ${backgroundColors.to} justify-between items-center`}
    >
      <div className="text-white uppercase">{title}</div>
      <SearchInput
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e?.target?.value);
          getResults(e?.target?.value);
        }}
        clickSearch={() => console.log(`search for ${searchValue}`)}
      />
    </header>
  );
}

export default SearchHeader;
