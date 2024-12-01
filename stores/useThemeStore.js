import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useThemeStore = create((set) => ({
  isDarkMode: false, // Varsayılan tema, light mode

  // Tema modunu değiştirme ve AsyncStorage'a kaydetme
  toggleTheme: async () => {
    set((state) => {
      const newTheme = !state.isDarkMode;
      AsyncStorage.setItem("theme", JSON.stringify(newTheme)); // Yeni tema bilgisini AsyncStorage'a kaydediyoruz
      return { isDarkMode: newTheme };
    });
  },
  // AsyncStorage'dan tema bilgisini yükleme
  loadTheme: async () => {
    const savedTheme = await AsyncStorage.getItem("theme");

    console.log("Tema Varmı ?", savedTheme);
    if (savedTheme !== null) {
      set({ isDarkMode: JSON.parse(savedTheme) });
    }
  },
}));

export default useThemeStore;
