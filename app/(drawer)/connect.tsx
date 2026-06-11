import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Connect = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="px-6 pt-4">
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <Text className="text-white font-bold text-3xl">Echora</Text>
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-2xl">Connect</Text>
            <Feather
              name="link"
              size={24}
              color="black"
              className=" bg-white rounded-full p-2 mx-3 border border-2 border-blue-500"
            />
          </View>
        </View>
        <View className="flex  mb-2 mt-2">
          <TextInput
            placeholder={"Search for friends"}
            placeholderTextColor="gray"
            className="bg-gray-100 rounded-xl p-4 border-1 border-blue-300 mr-2 "
          />
        </View>
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <View className="flex-row items-center">
            <TouchableOpacity className="bg-blue-200 mr-2 p-3 rounded">
              <Text className="text-white font-semibold">Following</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 p-3 rounded">
              <Text className="font-semibold">For you</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Feather
              name="user"
              size={24}
              color="black"
              className=" p-2 mr-4 bg-white rounded-full "
            />
          </TouchableOpacity>
        </View>
        <View className=" relative  w-full h-48 bg-white items-center justify-center rounded-lg mb-6 ">
          <View className="absolute top-0 left-0 flex-row items-center">
            <Text className=" font-semibold p-2 text-lg">Jamie Doe</Text>
            <Feather
              name="check"
              size={16}
              color="white"
              className="mr-2 bg-indigo-900 rounded-full "
            />
          </View>
          <Text className="text-2xl font-semibold ">New song is out !</Text>
          <View className=" w-full absolute bottom-0 justify-around flex-row p-2 ">
            <View className="flex-row items-center">
              <Feather
                name="heart"
                size={16}
                color="red"
                className="mr-2 bg-white rounded-full "
              />
              <Text className="font-semibold">Like</Text>
            </View>
            <View className="flex-row items-center">
              <Feather
                name="message-square"
                size={16}
                color="red"
                className="mr-2 bg-white rounded-full "
              />
              <Text className="font-semibold">Comment</Text>
            </View>
            <View className="flex-row items-center">
              <Feather
                name="share-2"
                size={16}
                color="red"
                className="mr-2 bg-white rounded-full "
              />
              <Text className="font-semibold">Share</Text>
            </View>
          </View>
        </View>
        <View className=" relative w-full h-48 bg-white items-start justify-center rounded-lg p-2 ">
          <View className="absolute top-0 left-0 flex-row items-center ">
            <Text className=" font-semibold p-2 text-lg">Arya Starr</Text>
            <Feather
              name="check"
              size={16}
              color="white"
              className="mr-2 bg-indigo-900 rounded-full "
            />
          </View>
          <View className="w-full">
            <Text className="mt-2 text-2xl font-semibold ">
              Do you love the new song?
            </Text>
            <View className=" p-2 h-10 w-[70%] bg-green-600 items-center justify-center mb-1 mt-1">
              <Text className="text-white font-semibold">70%</Text>
            </View>
            <View className=" p-2 h-10 w-[30%] bg-red-700 items-center justify-center">
              <Text className="text-white font-semibold">30%</Text>
            </View>
          </View>
          <View className=" w-full absolute bottom-0 justify-around flex-row p-2  ">
            <View className="flex-row items-center">
              <Feather
                name="heart"
                size={16}
                color="red"
                className="mr-2 bg-white rounded-full "
              />
              <Text className="font-semibold">Like</Text>
            </View>
            <View className="flex-row items-center">
              <Feather
                name="message-square"
                size={16}
                color="red"
                className="mr-2 bg-white rounded-full "
              />
              <Text className="font-semibold">Comment</Text>
            </View>
            <View className="flex-row items-center">
              <Feather
                name="share-2"
                size={16}
                color="red"
                className="mr-2 bg-white rounded-full "
              />
              <Text className="font-semibold">Share</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Connect;
