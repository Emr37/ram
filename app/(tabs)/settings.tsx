import { View, Text, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useThemeStore from '@/stores/useThemeStore';
import { useEffect } from 'react';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme, loadTheme } = useThemeStore(); // Zustand'dan tema durumu

  useEffect(() => {
    loadTheme()
  },[loadTheme])

  return (
  <SafeAreaView className={`w-full h-full ${isDarkMode ? "bg-black": undefined}`}>
    <View className="items-center justify-center h-full">
        <Text className={`text-xl ${isDarkMode && "text-slate-50"}`}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <View className='h-fit w-fit rounded-3xl px-3 bg-gray-300 justify-center items-center'>
          <Switch
          value={isDarkMode}
          onValueChange={toggleTheme} // Tema değiştirme fonksiyonu
        />
        </View>
    </View>
  </SafeAreaView>
  );
};

export default SettingsScreen;