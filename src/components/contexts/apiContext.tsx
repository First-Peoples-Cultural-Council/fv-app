import { ReactNode, createContext, useRef, MutableRefObject } from 'react';

export type ApiContextType = {
  isApiCallInProgress: MutableRefObject<boolean>;
};

export const ApiContext = createContext<ApiContextType>({
  isApiCallInProgress: { current: false },
});

export interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const isApiCallInProgress = useRef<boolean>(false);

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
