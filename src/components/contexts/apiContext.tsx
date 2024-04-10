import { ReactNode, useState, createContext, Dispatch, SetStateAction, useRef, MutableRefObject } from 'react';

export type ApiContextType = {
  isApiCallInProgress: MutableRefObject<boolean> | null,
};

export const ApiContext = createContext<ApiContextType>({
  isApiCallInProgress: null,
});

export interface ApiProviderProps {
  children: ReactNode;
};

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const isApiCallInProgress = useRef(false);

  return (
    <ApiContext.Provider
      value={{
        isApiCallInProgress,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
