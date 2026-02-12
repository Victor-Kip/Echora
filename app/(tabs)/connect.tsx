import React from "react";
import {ScrollView, Text, View, TextInput, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Feather} from "@expo/vector-icons";

const Connect = ()=>{
    return(
        <SafeAreaView className="flex-1 bg-indigo-900">
            <ScrollView className="px-6 pt-4">
                <View className="flex-row items-center justify-between mb-6 mt-2">
                    <Text className="text-white font-bold text-3xl">Wavrr</Text>
                    <View className="flex-row items-center">
                        <Text className="text-white font-bold text-2xl">Connect</Text>
                        <Feather name="link" size={24} color = "white" className=" p-2 mr-4 " />
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
                    <TouchableOpacity
                        className="bg-blue-200 mr-2 p-3 rounded">
                        <Text className= "text-white font-semibold">Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    className="bg-gray-200 p-3 rounded">
                        <Text className="font-semibold">For you</Text>
                    </TouchableOpacity>
                </View>
                    <Feather name="user" size={24} color = "black" className=" p-2 mr-4 bg-white rounded-full " />
                </View>
                <View className="w-full h-40 bg-white items-center justify-center rounded-lg">
                    <Text className = "text-2xl font-semibold ">Lots of yada yada by Hydra</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Connect;