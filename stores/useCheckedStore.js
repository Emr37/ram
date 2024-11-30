import { create } from "zustand";

const useCheckedStore = create((set) => ({
  checkedChars: [],

  // Seçilen karakteri ekleyen veya kaldıran fonksiyon
  setCheckedChars: (item) =>
    set((state) => {
      const newCheckedChars = state.checkedChars.includes(item.id)
        ? state.checkedChars.filter((char) => char.id !== item.id) // Karakterin id varsa, sil
        : [...state.checkedChars, item]; // Karakter yoksa, ekle
      return { checkedChars: newCheckedChars };
    }),
}));

export default useCheckedStore;
