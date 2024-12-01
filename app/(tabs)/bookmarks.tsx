import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import useBookmarkStore from '@/stores/useBookmarkStore';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CharactersCard from '@/components/CharactersCard';
import useThemeStore from '@/stores/useThemeStore';


const BookMarksScreen = () => {
  const router = useRouter();
  const { bookmarks, loadBookmarks } = useBookmarkStore();
  const {isDarkMode} = useThemeStore()

  useEffect(() => {

    loadBookmarks();

  },[loadBookmarks])

  return (
  <SafeAreaView className={`w-full h-full ${isDarkMode ? "bg-black": undefined}`}>
    <View className="flex-1 items-center ">
      <View className='flex-row w-full justify-around items-center '>        
        <Text className={`${isDarkMode ? "text-slate-200" : undefined } text-2xl m-4`}>Bookmarks Screen</Text>        
      </View>
      {bookmarks.length > 0 ?
        <FlatList        
          className='mt-2 w-11/12 rounded-t-2xl border-solid border-gray-400 border-2 border-b-0'
          data={bookmarks}          
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <CharactersCard item={item} search={false} word={""} bookmarked={true}/>
          )}
       />: <View className='w-full h-full justify-center items-center'><Text className='text-lg'>Any bookmark has been added yet</Text></View>
      }      
    </View>
  </SafeAreaView>
  );
};

export default BookMarksScreen;