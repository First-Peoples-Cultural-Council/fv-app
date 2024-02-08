import classNames from 'classnames';
import { ChangeEvent } from 'react';

export interface SearchInputProps {
  className?: string;
  value: string;
  onChange: (value: ChangeEvent<any>) => void;
  clickSearch: () => void;
  onClear?: () => void;
}

export function SearchInput({
  className,
  value,
  onChange,
  clickSearch,
  onClear,
}: SearchInputProps) {
  return (
    <div className="flex items-center w-full max-w-md ml-2 group relative">
      <input
        value={value}
        onChange={onChange}
        className={classNames(
          'pl-2 rounded-l h-7 border border-gray-400 w-full shadow shadow-inner',
          className
        )}
      />
      <button
        onClick={clickSearch}
        className="py-1 px-2.5 h-7 rounded-r bg-white border border-gray-400 border-l-0 flex items-center"
      >
        <i className="fv-search text-text-gray" />
      </button>
      <button
        onClick={onClear}
        className="opacity-0 group-hover:opacity-100 absolute right-12 top-1/2 transform -translate-y-1/2 text-xs cursor-pointer transition-opacity duration-200 ease-in-out"
      >
        <i className="fv-close text-gray-500" />
      </button>
    </div>
  );
}

export default SearchInput;
