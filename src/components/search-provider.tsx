import { ReactNode, createContext } from 'react';
import { dataDict } from './temp-word-list';

const l1SearchAlgWord = (window as any).distanceCalculatorWord(dataDict);
export const SearchContext = createContext({
  l1SearchAlgWord,
});

export interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  return (
    <SearchContext.Provider
      value={{
        l1SearchAlgWord,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
