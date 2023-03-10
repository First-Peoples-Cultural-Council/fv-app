import classNames from 'classnames';
import { ChangeEvent } from 'react';

export interface SearchInputProps {
  className?: string;
  value: string;
  onChange: (value: ChangeEvent<any>) => void;
  clickSearch: () => void;
}

export function SearchInput({
  className,
  value,
  onChange,
  clickSearch,
}: SearchInputProps) {
  return (
    <div className="flex items-center w-full max-w-md">
      <input
        value={value}
        className={classNames(
          'pl-2 rounded-l h-7 border border-gray-400 w-full',
          className
        )}
      />
      <button
        onClick={clickSearch}
        className="py-1 px-2.5 h-7 rounded-r bg-white border border-gray-400 border-l-0 flex items-center"
      >
        <i className="fv-search text-text-gray" />
      </button>
    </div>
  );
}

export default SearchInput;
