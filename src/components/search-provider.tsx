import {  ReactNode, createContext, useEffect, useState } from 'react';
import fetchWordsData from '../services/wordsApiService';

declare global {
  interface Window {
    distanceCalculatorWord: (dataDict: any[]) => any;
  }
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<any>({});

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchValue, setSearchValue] = useState<any>({
    l1SearchAlgWord: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataDict = await fetchWordsData();
        const result = window.distanceCalculatorWord(dataDict);
        setSearchValue({ l1SearchAlgWord: result });
      } catch (error) {
        // Handle errors if fetch or calculation fails
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
