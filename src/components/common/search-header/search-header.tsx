import SearchInput from '../search-input/search-input';
import { useContext, useState } from 'react';
import { SearchContext } from '../../search-provider';
import { populateMatchesElements } from '../../../util/searchUtils';

export interface SearchHeaderProps {
  searchMatchRef: HTMLDivElement | null;
  title: string;
  backgroundColors: { to: string; from: string };
}

export function SearchHeader({ searchMatchRef, title, backgroundColors }: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const {l1SearchAlgWord} = useContext(SearchContext)

  const getResults = (rawSearchQuery: string) => {
    // Edit Distance Thresholds
    const matchThreshold = 0;
    const partialThreshold = 1;
    const maybeThreshold = 3;

    if (rawSearchQuery.length > 1) {
      // Normalize
      // @ts-ignore
      let mtd: any = window["mtd"];
      let searchQuery = mtd.convertQuery(rawSearchQuery);

      let target = l1SearchAlgWord(searchQuery); // Will search for "word" and "compare_form" (if it exists) in each entry
      // Match containers
      let allMatches: any[] = [];
      let matches: any[] = [];
      let partMatches: any[] = [];
      let maybeMatches: any[] = [];

      var populateTarget = () => {
        for (let result of target) {
          let entry = result[1];
          entry.type = "L1";
          entry.strategy = "lev" // In the production version of MTD we actually do more than just the Levenstein search, but for this demo this is sufficient.
          entry.distance = result[0]
          allMatches.push(entry);
        }
      };

      var mergeMatches = () => {
        for (let entry of allMatches) {
          if ("distance" in entry) {
            if (entry.distance === matchThreshold) {
              matches.push(entry);
            } else if (
              "distance" in entry &&
              entry.distance <= partialThreshold &&
              entry.distance > matchThreshold
            ) {
              partMatches.push(entry);
            } else if (
              entry.distance <= maybeThreshold &&
              entry.distance > partialThreshold
            ) {
              maybeMatches.push(entry);
            }
          } else {
            matches.push(entry);
          }
        }
      };
      populateTarget();
      mergeMatches();
      populateMatchesElements([...matches, ...partMatches, ...maybeMatches], searchMatchRef)
    }
  };

  return (
    <header
      className={`flex py-5 px-4 bg-gradient-to-t ${backgroundColors.from} ${backgroundColors.to} justify-between items-center`}
    >
      <div className="text-white uppercase">{title}</div>
      <SearchInput
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e?.target?.value)
          getResults(e?.target?.value);
        }}
        clickSearch={() => console.log(`search for ${searchValue}`)}
      />
    </header>
  );
}

export default SearchHeader;
