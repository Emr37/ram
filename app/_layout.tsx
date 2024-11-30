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

// Prevent the splash screen from auto-hiding before asset loading is complete.s
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

   useEffect(() => {
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

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
    
    <StatusBar style="auto" />
    </SafeAreaProvider>
    </QueryClientProvider>
     
  );
}

