import { useFonts } from 'expo-font';
import { Tabs, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Custom colorscheme
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useBookmarkStore from '@/stores/useBookmarkStore';
import useThemeStore from '@/stores/useThemeStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.s
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()


export default function RootLayout() {
  const {loadBookmarks} = useBookmarkStore();
  const {loadTheme, isDarkMode } = useThemeStore(); // Zustand'dan tema durumu

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  

   useEffect(() => {
    loadBookmarks()
    loadTheme()
     if (loaded) {
       SplashScreen.hideAsync();
     }
   }, [loaded]);

   if (!loaded) {
     return null;
   }


  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>  
      <StatusBar style={`${isDarkMode ? "light": "dark"}`} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
      
    
    </SafeAreaProvider>
    </QueryClientProvider>
     
  );
}

