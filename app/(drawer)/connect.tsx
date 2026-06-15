import PostCard from "@/components/connect/postcard";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_POSTS = [
  {
    id: 1,
    content: "New song is out !",
    post_type: "text",
    poll_options: null,
    author: {
      username: "Jamie Doe",
      role: "artist",
    },
  },
  {
    id: 2,
    content: "Do you love the new song?",
    post_type: "poll",
    poll_options: ["Yes", "No"],
    percentages: [70, 30],
    author: {
      username: "Jane Doe",
      role: "user",
    },
  },
];
const Connect = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("For You");
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
        ListHeaderComponent={
          <>
            {/*App and page title*/}
            <View className="flex-row items-center justify-between mb-6 mt-2">
              <Text className="text-white font-bold text-3xl">Echora</Text>
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-2xl">Connect</Text>
                <Feather
                  name="link"
                  size={24}
                  color="#3b82f6"
                  className=" bg-white rounded-full p-2 mx-3 border border-2 border-blue-500"
                />
              </View>
            </View>
            {/*search input*/}
            <View className="mb-4">
              <TextInput
                placeholder="Search for friends"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="bg-gray-100 rounded-xl p-4 border border-blue-300 text-black"
              />
            </View>
            {/*navigation and profile action*/}
            <View className="flex-row items-center justify-between mb-6 ">
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => setActiveFilter("Following")}
                  className={`mr-2 p-3 rounded-lg ${activeFilter == "Following" ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  <Text
                    className={`${activeFilter == "Following" ? "text-white font-semibold" : "text-black font-semibold "}`}
                  >
                    Following
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveFilter("For You")}
                  className={` p-3 rounded-lg ${activeFilter == "For You" ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  <Text
                    className={`${activeFilter == "For You" ? "text-white font-semibold" : "text-black font-semibold "}`}
                  >
                    For You
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Feather
                  name="user"
                  size={24}
                  color="black"
                  className=" p-2 bg-white rounded-full "
                />
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};
export default Connect;
