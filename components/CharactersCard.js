import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useCheckedStore from "../stores/useCheckedStore";

const CharactersCard = ({ item, search, word }) => {
  const [isChecked, setChecked] = useState(false);
  const { setCheckedChars, checkedChars } = useCheckedStore();

  const checkChar = () => {
    console.log(checkedChars.length);
    setChecked((x) => !x);
    setCheckedChars(item);
  };

  const isSame = () => {
    checkedChars?.map((c) => {
      c.id === item.id && setChecked(true);
    });
  };

  useEffect(() => {
    isSame();
  }, [checkedChars, item]);

  const renderHighlightedText = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi")); // Büyük/küçük harfe duyarsız eşleşme

    return parts.map((part, index) => {
      // Eğer parça eşleşen kelimelerse, kalın yap
      if (part.toLowerCase() === keyword.toLowerCase()) {
        return (
          <Text key={index} style={{ fontWeight: "700" }}>
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  return (
    <View className="flex-row py-3 items-center border-solid border-gray-400 border-b-2	">
      {search && (
        <Checkbox style={{ borderRadius: 4 }} className="ml-2" value={isChecked} onValueChange={() => checkChar()} color={isChecked ? "#0A5EB0" : undefined} />
      )}
      <Image style={{ height: 50, width: 50, marginHorizontal: 8, borderRadius: 8 }} contentFit="contain" source={{ uri: item?.image }} />
      <View className="flex-1">
        <Text className="text-xl">{renderHighlightedText(item?.name, word)}</Text>
        <Text className="text-lg">{item?.episode.length === 1 ? "1 Episode" : `${item?.episode.length} Episodes`}</Text>
      </View>
      {!search && (
        <TouchableOpacity style={{ position: "absolute", borderRadius: 4 }} className="-top-0.5 right-2 ">
          <FontAwesome name="bookmark-o" color={true ? undefined : "#0A5EB0"} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CharactersCard;
