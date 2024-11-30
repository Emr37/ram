import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import {  fetchAllCharacters, fetchCharacter, fetchCharacters, filteredFetchByName } from "../../services"
import CharactersCard from '../../components/CharactersCard';
import { useQuery } from '@tanstack/react-query';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useCheckedStore from '@/stores/useCheckedStore';

const SearchScreen = () => {
  const {checkedChars} = useCheckedStore();

  //const [ids, setIds] = useState<number[]>([1, 2]); // Başlangıç ID'leri
  //const [id, setId] = useState<number>(5);
  const [input, setInput] = useState<string>("");

  const {data: filteredChars, isPending, error, isError} = useQuery({
    queryKey:["character", input],
    queryFn: () => filteredFetchByName(input)
  });

  // const {data: chars, isPending:charsIsPending, error:charsError, isError: charsIsError} = useQuery({
  //   queryKey:["character", ids],
  //   queryFn: () => fetchCharacters(ids)
  // });
console.log('checkedChars', JSON.stringify(checkedChars, null,2));
 
  return (
    <View className="flex-1 items-center pt-safe">
      <View className='flex-row w-full justify-around items-center bg-gray-300'>

        <FlatList
        className='bg-pink-400'
        data={checkedChars}
        keyExtractor={(item) => item?.id}
        renderItem={({item}) => (<Text>{item.name}</Text>
        )}
        />
        <TextInput 
        placeholder='Search Screen'
        value={input}
        onChangeText={(e) => setInput(e)}
        />
        
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
          renderItem={({ item }) => (
            <CharactersCard item={item} search={true} word={input.toLocaleLowerCase()}/>
          )}
        />
      )}
    </View>
  );
};
export default SearchScreen;