import { ReactNode, createContext, useRef, useMemo, MutableRefObject } from 'react';

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
  const contextValue = useMemo(() => ({ isApiCallInProgress }), [isApiCallInProgress]);

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};
