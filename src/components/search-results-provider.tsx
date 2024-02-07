import { createContext, ReactNode } from 'react';

export type SearchResultsType = {} | null;

export const SearchResultsContext = createContext<{
  rawSearchQuery: string;
  entries: SearchResultsType;
} | null>(null);

export interface SearchResultsProviderProps {
  children: ReactNode;
  results: { rawSearchQuery: string; entries: SearchResultsType };
}

export const SearchResultsProvider = ({
  results,
  children,
}: SearchResultsProviderProps) => {
  return (
    <SearchResultsContext.Provider value={results}>
      {children}
    </SearchResultsContext.Provider>
  );
};
