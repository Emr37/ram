import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useCheckedStore from "../stores/useCheckedStore";
import useBookmarkStore from "@/stores/useBookmarkStore";
import useThemeStore from "@/stores/useThemeStore";

const CharactersCard = ({ item, search, word, bookmarked }) => {
  const { setCheckedChars, checkedChars } = useCheckedStore();
  const { addBookmark, removeBookmark } = useBookmarkStore();
  const { isDarkMode } = useThemeStore();

  const checkChar = (i) => {
    i.checked = !i.checked; // Yerel seçilme durumuna bağlı olarak item (veya i) ın checked özelliğine true/false ataması yapıyor.
    setCheckedChars(i); //Manipüle edilmiş i veya item'ın store'a gönderilmesini sağlıyor.
  };

  const isSame = (a) => {
    checkedChars.map((i) => {
      if (i.id === a.id) {
        a.checked = true;
      }
    });
  };

  useEffect(() => {
    isSame(item);
  }, [item]);

  const renderHighlightedText = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi")); // Büyük/küçük harfe duyarsız eşleşme

    return parts.map((part, index) => {
      // Eğer parça eşleşen kelimelerse, kalın yap
      if (part.toLowerCase() === keyword.toLowerCase()) {
        return (
          <Text key={index} style={{ fontWeight: "800" }}>
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
        <View className="p-1">
          <Checkbox
            style={{ borderRadius: 4 }}
            className="ml-2 h-2 w-2"
            value={item.checked}
            onValueChange={() => checkChar(item)}
            color={item.checked ? "#0A5EB0" : undefined}
          />
        </View>
      )}
      <Image style={{ height: 50, width: 50, marginHorizontal: 8, borderRadius: 8 }} contentFit="contain" source={{ uri: item?.image }} />
      <View className="flex-1">
        <Text className={`text-xl ${isDarkMode ? "text-slate-50" : undefined}`}>{renderHighlightedText(item?.name, word)}</Text>
        <Text className={`text-lg ${isDarkMode ? "text-slate-50" : undefined}`}>
          {item?.episode.length === 1 ? "1 Episode" : `${item?.episode.length} Episodes`}
        </Text>
      </View>
      {!search && (
        <TouchableOpacity
          onPress={() => (bookmarked ? removeBookmark(item) : addBookmark(item))}
          style={{ position: "absolute", borderRadius: 4 }}
          className="-top-0.5 right-2 "
        >
          <FontAwesome name={bookmarked ? "bookmark" : "bookmark-o"} color={true ? "#9ca3af" : "#0A5EB0"} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CharactersCard;
