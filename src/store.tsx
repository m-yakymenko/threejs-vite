import { create } from 'zustand'

interface StoreInterface {
  turnOnDotsConnectorMode: boolean;
}

export const useStateStore = create<StoreInterface>((set) => ({
  turnOnDotsConnectorMode: false,
  //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //removeAllBears: () => set({ bears: 0 }),
}))
