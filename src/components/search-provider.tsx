import { ReactNode, createContext, useMemo } from 'react';
import { dataDict } from './temp-word-list';

const l1SearchAlgWord = (window as any).distanceCalculatorWord(dataDict);
export const SearchContext = createContext({
  l1SearchAlgWord,
});

export interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const searchValue = useMemo(() => {
    return {
      l1SearchAlgWord,
    };
  }, []);

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
