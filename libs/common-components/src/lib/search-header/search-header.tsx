import styles from './search-header.module.css';
import SearchInput from '../search-input/search-input';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface SearchHeaderProps {
  title: string;
}

export function SearchHeader({ title }: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <header className="flex py-5 px-4 bg-gradient-to-t from-color-dark-search-header to-color-light-search-header justify-between items-center">
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
