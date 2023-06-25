import SearchInput from '../search-input/search-input';
import { useContext, useState } from 'react';
import { SearchContext } from '../../search-provider';
import { populateMatchesElements } from '../../../util/searchUtils';

const MATCH_THRESHOLD = 0;
const PARTIAL_THRESHOLD = 1;
const MAYBE_THRESHOLD = 3;

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
  const { l1SearchAlgWord } = useContext(SearchContext);

  const populateTarget = (searchQuery: any) => {
    const allMatches: any[] = [];
    const target = l1SearchAlgWord(searchQuery); // Will search for "word" and "compare_form" (if it exists) in each entry
    for (let result of target) {
      const entry = result[1];
      entry.type = 'L1';
      entry.strategy = 'lev'; // In the production version of MTD we actually do more than just the Levenstein search, but for this demo this is sufficient.
      entry.distance = result[0];
      allMatches.push(entry);
    }
    return allMatches;
  };

  const mergeMatches = (allMatches: any[]) => {
    const matches: any[] = [];
    const partMatches: any[] = [];
    const maybeMatches: any[] = [];
    for (let entry of allMatches) {
      if ('distance' in entry) {
        if (entry.distance === MATCH_THRESHOLD) {
          matches.push(entry);
        } else if (
          'distance' in entry &&
          entry.distance <= PARTIAL_THRESHOLD &&
          entry.distance > MATCH_THRESHOLD
        ) {
          partMatches.push(entry);
        } else if (
          entry.distance <= MAYBE_THRESHOLD &&
          entry.distance > PARTIAL_THRESHOLD
        ) {
          maybeMatches.push(entry);
        }
      } else {
        matches.push(entry);
      }
    }
    return { matches, maybeMatches, partMatches };
  };

  const getResults = (rawSearchQuery: string) => {
    // Edit Distance Thresholds

    if (rawSearchQuery.length > 1) {
      // Normalize
      // @ts-ignore
      const mtd: any = window['mtd'];
      const searchQuery = mtd.convertQuery(rawSearchQuery);

      const allMatches = populateTarget(searchQuery);
      const { matches, maybeMatches, partMatches } = mergeMatches(allMatches);
      populateMatchesElements(
        [...matches, ...partMatches, ...maybeMatches],
        searchMatchRef
      );
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
