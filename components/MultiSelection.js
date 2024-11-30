import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";

const MultiSelectWithInput = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputText, setInputText] = useState("");

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  const toggleItemSelection = (itemValue) => {
    setSelectedItems((prevState) => {
      if (prevState.includes(itemValue)) {
        return prevState.filter((item) => item !== itemValue);
      } else {
        return [...prevState, itemValue];
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={`flex-row items-center p-2 border mb-2 rounded-lg`} onPress={() => toggleItemSelection(item.value)}>
      <Text style={`text-lg mr-2`}>{item.label}</Text>
      {selectedItems.includes(item.value) && <Text style={`text-green-500 text-lg`}>✔</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={`p-4`}>
      <Text style={`text-2xl mb-4`}>Select Multiple Options and Enter Text</Text>

      {/* Dropdown list */}
      <View style={`mb-4`}>
        <FlatList data={options} keyExtractor={(item) => item.value} renderItem={renderItem} extraData={selectedItems} />
      </View>

      {/* TextInput for additional input */}
      <TextInput
        style={`h-10 border border-gray-400 p-2 mb-4 rounded-lg`}
        placeholder="Type something here"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />

      {/* Display selected items and input text */}
      <Text style={`mt-4 text-lg`}>Selected Items: {selectedItems.join(", ")}</Text>
      <Text style={`mt-2 text-lg text-gray-500`}>Input Text: {inputText}</Text>
    </View>
  );
};

export default MultiSelectWithInput;
