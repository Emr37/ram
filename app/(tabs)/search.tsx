import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {  filteredFetchByName } from "../../services"
import CharactersCard from '../../components/CharactersCard';
import { useQuery } from '@tanstack/react-query';
import useCheckedStore from '@/stores/useCheckedStore';
import CheckedChars from '@/components/CheckedChars';
import { SafeAreaView } from 'react-native-safe-area-context';



const SearchScreen = () => {
  const {checkedChars} = useCheckedStore();

  const [input, setInput] = useState<string>("");

  const {data: filteredChars, isPending, error, isError} = useQuery({
    queryKey:["character", input],
    queryFn: () => filteredFetchByName(input)
  });

 
  return (
    <SafeAreaView className='w-full h-full '>
    <View className="flex-1 items-center ">
      <View className='flex-row w-11/12 justify-center items-center p-2 rounded-2xl border-solid border-gray-400 border-2 ' >
        {checkedChars.length > 0 &&        
        <FlatList
        className='h-full rounded-xl  max-w-fit'
        data={checkedChars}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={({item}) => (<CheckedChars item={item} filtered={filteredChars}/>)
        }
        />
      }
        <View className='max-w-full min-w-fit w-1/4'>
          <TextInput
          className='w-max text-base text-wrap rounded-xl text-center' 
          
          placeholder='Search'
          multiline={true}
          value={input}
          onChangeText={(e) => setInput(e)}
          />
        </View>
      </View>
            
      {isPending ? (
        <ActivityIndicator size="large" />
      ) : isError ? (
        <Text>{error.message}</Text>
      ) : (
        <FlatList        
          className='mt-2 w-11/12 rounded-t-2xl border-solid border-gray-400 border-2 border-b-0'
          data={filteredChars}          
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => {
             checkedChars.map((e:any) => {   // Kelime ile arama yaptıktan sonrada yeni yapılmış olan sorgunun manipüle edilmesi
               if(e.id == item.id){
                 item.checked = true;
               }
             }
            )
            return(<CharactersCard item={item} search={true} word={input.toLocaleLowerCase()} />)

          }
          }
        />
      )}
    </View>
    </SafeAreaView>
  );
};
export default SearchScreen;