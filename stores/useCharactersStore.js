import { create } from "zustand";

const useCharacterStore = create((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
}));

export default useCharacterStore;
