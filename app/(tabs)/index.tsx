import React, { useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity, } from 'react-native';
import { useRouter } from 'expo-router';
import {  fetchAllCharacters, fetchCharacter, fetchCharacters } from "../../services"
import CharactersCard from '../../components/CharactersCard';
import { useQuery } from '@tanstack/react-query';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';





const HomeScreen = () => {
  const [page, setPage] = useState<number>(4);

  const nextPage = () =>{
    setPage(page + 1);
  }
  
  const prevPage = () => {
    page > 1 ? setPage(page - 1) : alert("İlk sayfada bulunuyorsunuz!");
  }

  const {data: allCharacters, isPending: allCharPending,  error: allCharError, isError: allCharIsError} = useQuery({
    queryKey:["character", page],
    queryFn: () => fetchAllCharacters(page)
  });

  return (
    <SafeAreaView className='w-full h-full'>
    <View className="flex-1 items-center ">
      <View className='flex-row w-full justify-around items-center '>
        <TouchableOpacity onPress={prevPage} className='h-fit'>
          <FontAwesome name='arrow-circle-o-left' color={"#9ca3af"} size={36}/>
        </TouchableOpacity>
        <Text className="text-2xl m-4">Home Screen</Text>
        <TouchableOpacity onPress={nextPage} className='h-fit'>
          <FontAwesome name='arrow-circle-o-right' color={"#9ca3af"} size={36}/>
        </TouchableOpacity>
      </View>
            
      {allCharPending ? (
        <ActivityIndicator size="large" />
      ) : allCharIsError ? (
        <Text>{allCharError.message}</Text>
      ) : (
        <FlatList        
          className='mt-2 w-11/12 rounded-t-2xl border-solid border-gray-400 border-2 border-b-0'
          data={allCharacters}          
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <CharactersCard item={item} search={false} word={""}/>
          )}
          />
      )}

    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;