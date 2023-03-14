import SearchInput from '../search-input/search-input';
import { useState } from 'react';

export interface SearchHeaderProps {
  title: string;
  backgroundColors: { to: string; from: string };
}

export function SearchHeader({ title, backgroundColors }: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <header
      className={`flex py-5 px-4 bg-gradient-to-t ${backgroundColors.from} ${backgroundColors.to} justify-between items-center`}
    >
      <div className="text-white uppercase">{title}</div>
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e?.target?.value)}
        clickSearch={() => console.log(`search for ${searchValue}`)}
      />
    </header>
  );
}

export default SearchHeader;
