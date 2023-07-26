import { ReactNode, createContext, useMemo } from 'react';
import { dataDict } from './temp-word-list';

declare global {
  interface Window {
    distanceCalculatorWord: (dataDict: any[]) => any;
  }
}

const getSearch = () => {
  return window.distanceCalculatorWord(dataDict);
}
export const SearchContext = createContext({
  l1SearchAlgWord: getSearch(),
});

export interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const searchValue = useMemo(() => {
    return {
      l1SearchAlgWord: getSearch(),
    };
  }, []);

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
