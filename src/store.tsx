import { create } from 'zustand'

interface StoreInterface {
  isTurnOnDotsConnectorMode: boolean,
  isStartEndDotsSelecting: boolean,
}

export const useStateStore = create<StoreInterface>((
  //set
) => ({
  isTurnOnDotsConnectorMode: false,
  isStartEndDotsSelecting: false,
  //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //removeAllBears: () => set({ bears: 0 }),
}))
