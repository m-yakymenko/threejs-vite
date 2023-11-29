import { create } from 'zustand'

interface StoreInterface {
  isTurnOnDotsConnectorMode: boolean;
}

export const useStateStore = create<StoreInterface>((set) => ({
  isTurnOnDotsConnectorMode: false,
  //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //removeAllBears: () => set({ bears: 0 }),
}))
