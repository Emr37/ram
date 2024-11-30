import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useCheckedStore from "@/stores/useCheckedStore";

const CheckedChars = ({ item, filtered }) => {
  const { setCheckedChars } = useCheckedStore();

  //Arama işleminden sonra üst bardan alttaki liste elamanlarını silebilmek için filtered.map eklendi.

  const deleteChar = (a) => {
    a.checked = false;
    setCheckedChars(a);
    filtered.map((f) => {
      if (f.id === a.id) {
        f.checked = false;
      }
    });
  };
  return (
    <View className="items-center justify-center bg-gray-300 flex-row px-2 rounded-xl mr-1">
      <Text className="text-base mr-1">{item.name}</Text>
      <TouchableOpacity onPress={() => deleteChar(item)}>
        <FontAwesome name="window-close" color={"#aaabbb"} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default CheckedChars;
