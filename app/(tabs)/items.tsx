import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Items = ()=>{
    return(
        <SafeAreaView className="flex-1 bg-indigo-900 ">
            <ScrollView className="p-6 pt-4">
                <View className="flex-row justify-between items-center mb-6 mt-2">
                    <Text className="text-white font-bold text-3xl">Wavrr</Text>
                    <View className="flex-row items-center">
                        <Text className= "text-2xl text-white font-bold">Items</Text>
                        <Feather name= "shopping-bag" size={24} color = "white" className=" p-2 mr-4 " />
                    </View>
                </View>
                <View className="flex-row items-center justify-around">
                    <TouchableOpacity className="rounded bg-blue-500">
                        <Text className="text-white text-lg font-bold px-4  m-2">Merch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="rounded bg-blue-500">
                        <Text className="text-white text-lg font-bold px-4  m-2">CDs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="rounded bg-blue-500">
                        <Text className="text-white text-lg font-bold px-4 m-2">Songs</Text>
                    </TouchableOpacity>
                </View>
                <TextInput placeholder="Search items..." className="bg-gray-200 rounded px-4 py-2 mt-4 mb-6" />
                <Text className="text-2xl text-white font-bold mb-2">Based on artists you follow</Text>
                 <View className="border-t border-gray-200 my-2 mb-6" />
                 <TouchableOpacity className="relative flex-row "
                 onPress={() => router.push({ pathname: "/items/[id]", params: { id: "1" } })}>
                    <View className="bg-gray-200  w-[48%] h-40 rounded mb-4"></View>
                    <Text className="text-white text-2xl font-bold mb-2 p-2">Item Name</Text>
                        <View className="absolute bottom-5 right-0 bg-gray-200">
                            <Text className="text-black font-semibold text-xl p-2">$0.00</Text>
                        </View>
                 </TouchableOpacity>
                 <View className="border-t border-gray-200 my-2 mb-6" />
                 <TouchableOpacity className="relative flex-row "
                 onPress={() => router.push(`/items/${2}`)}>
                    <View className="bg-gray-200  w-[48%] h-40 rounded mb-4"></View>
                    <Text className="text-white text-2xl font-bold mb-2 p-2">Item Name</Text>
                        <View className="absolute bottom-5 right-0 bg-gray-200">
                            <Text className="text-black font-semibold text-xl p-2">$0.00</Text>
                        </View>
                 </TouchableOpacity>
                 <View className="border-t border-gray-200 my-2 mb-6" />
                 <TouchableOpacity className="relative flex-row ">
                    <View className="bg-gray-200  w-[48%] h-40 rounded mb-4"></View>
                    <Text className="text-white text-2xl font-bold mb-2 p-2">Item Name</Text>
                        <View className="absolute bottom-5 right-0 bg-gray-200">
                            <Text className="text-black font-semibold text-xl p-2">$0.00</Text>
                        </View>
                 </TouchableOpacity>
                 <View className="border-t border-gray-200 my-2 mb-6" />
            </ScrollView>
        </SafeAreaView>
    )
}
export default Items;