import { create } from "zustand";

const useCheckedStore = create((set) => ({
  checkedChars: [],

  // Seçilen karakteri ekleyen veya kaldıran fonksiyon
  setCheckedChars: (item) => {
    console.log("check store", item.name, " ", item.checked);
    set((state) => {
      const newChars = item.checked
        ? [...state.checkedChars, item] // Karakter yoksa, ekle
        : state.checkedChars.filter((char) => char.id !== item.id); // Karakterin id varsa, sil

      return { checkedChars: newChars };
    });
  },
}));

export default useCheckedStore;
