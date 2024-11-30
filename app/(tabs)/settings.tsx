import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl mb-4">Settings Screen</Text>
      
    </View>
  );
};

export default SettingsScreen;