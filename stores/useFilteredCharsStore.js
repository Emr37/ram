import { create } from "zustand";

const useFilteredCharsStore = create((set) => ({
  filteredStore: [],

  setFilteredStore: (characters) => set({ filteredStore: characters }),
}));

export default useFilteredCharsStore;
