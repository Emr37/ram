import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const BookMarksScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl mb-4">Bookmarks Screen</Text>
      
    </View>
  );
};

export default BookMarksScreen;