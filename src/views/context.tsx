import { ReactNode, createContext, useContext } from 'react';
import { store } from '../store';

const StoreContext = createContext(store);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
