import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Zustand store'u
const useBookmarkStore = create((set) => ({
  bookmarks: [], // Yer imlerini tutan dizi

  // Yer imi eklemek
  addBookmark: async (bookmark) => {
    set((state) => {
      const updatedBookmarks = [...state.bookmarks, bookmark];
      AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)); // AsyncStorage'a kaydet
      return { bookmarks: updatedBookmarks };
    });
  },

  // Yer imi silmek
  removeBookmark: async (bookmark) => {
    set((state) => {
      const updatedBookmarks = state.bookmarks.filter((b) => b !== bookmark);
      AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)); // AsyncStorage'a güncelle
      return { bookmarks: updatedBookmarks };
    });
  },

  // Yer imlerini yüklemek
  loadBookmarks: async () => {
    const storedBookmarks = await AsyncStorage.getItem("bookmarks");
    if (storedBookmarks) {
      set({ bookmarks: JSON.parse(storedBookmarks) });
    }
  },
}));

export default useBookmarkStore;
