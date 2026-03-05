import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  dropdown: {
    padding: 14,
    height: 50,
    borderColor: "#4c75ea",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    width: "50%",
  },
  listContainer: {
    backgroundColor: "#99a1af",
    borderRadius: 7,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 2,
    margin: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#1c398e",
    fontWeight: "bold",
  },
  placeholder: {
    color: "#060a17",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    fontSize: 16,
    color: "#1c398e",
    fontWeight: "bold",
  },
});

const options = [
  { label: "Genre", value: "Genre" },
  { label: "Liked Songs", value: "Liked Songs" },
  { label: "Recently Played", value: "Recently Played" },
  { label: "Friends", value: "Friends" },
];

const songs = [
  { id: "1", name: "Life on" },
  { id: "2", name: "Today" },
  { id: "3", name: "Heal the world" },
  { id: "4", name: "Midnight Echo" },
  { id: "5", name: "Urban Rhythm" },
  { id: "6", name: "Neon Dreams" },
  { id: "7", name: "Silent Waves" },
  { id: "8", name: "Golden Hour" },
  { id: "9", name: "Cloud Chaser" },
];
const Discover = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <ScrollView className="px-6 pt-4">
        <View className="flex-row items-center justify-between mb-8 mt-2">
          <Text className="text-white font-bold text-3xl">Wavrr</Text>
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-2xl">Discover</Text>
            <Feather
              name="compass"
              size={24}
              color="black"
              className=" bg-white rounded-full p-2 mx-3 border border-2 border-blue-500"
            />
          </View>
        </View>
        <View>
          <Text className="text-white font-semibold text-2xl mb-2">
            New songs for You
          </Text>
          <Dropdown
            data={options}
            labelField="label"
            style={styles.dropdown}
            containerStyle={styles.listContainer}
            itemContainerStyle={styles.itemContainer}
            itemTextStyle={styles.itemText}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            valueField="value"
            placeholder="Based on"
            onChange={(item) => console.log(item)}
          />
          {songs.map((item) => (
            <View key={item.id}>
              <View className="mt-8 bg-whiteview p-2 flex flex-row items-center justify-between rounded border ">
                <Text className="text-black font-semibold text-xl p-2">
                  {item.name}
                </Text>
                <View className="flex-row items-center justify-between mr-2">
                  <TouchableOpacity>
                    <Feather name="play" size={24} className="p-2" />
                  </TouchableOpacity>
                  <Text className="font-semibold p-2">00.00</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Discover;
