import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Feather} from "@expo/vector-icons";
const Index = () => {
    return (
        <SafeAreaView className = "flex-1 bg-indigo-900 ">
            <ScrollView className="px-6 pt-4">
                <View className="flex-row items-center justify-between mb-8 mt-2">
                    <Text className="text-white font-bold text-3xl">Wavrr</Text>
                    <TextInput
                    placeholder={"Search for a song ..."}
                    placeholderTextColor="gray"
                    className=" bg-gray-100 rounded-xl p-4 border-2 border-blue-300 mr-2 "
                    />
                </View>
                <View>
                    <Text className="text-white font-semibold text-2xl mb-2">Recently Played</Text>
                    <View className="bg-gray-200 p-2 flex flex-row items-center justify-between rounded border mb-3">
                        <Text className="text-black font-semibold text-xl p-2">Song Name</Text>
                        <View className="flex-row items-center justify-between mr-2">
                            <TouchableOpacity>
                            <Feather name="play" size={24} className="p-2"/>
                            </TouchableOpacity>
                            <Text className="font-semibold p-2">00.00</Text>
                        </View>
                    </View>
                    <View className="bg-gray-200 p-2 flex flex-row items-center justify-between rounded border mb-3">
                        <Text className="text-black font-semibold text-xl p-2">Song Name</Text>
                        <View className="flex-row items-center justify-between mr-2">
                            <TouchableOpacity>
                                <Feather name="play" size={24} className="p-2"/>
                            </TouchableOpacity>
                            <Text className="font-semibold p-2">00.00</Text>
                        </View>
                    </View>
                    <View className="bg-gray-200 p-2 flex flex-row items-center justify-between rounded border mb-3">
                        <Text className="text-black font-semibold text-xl p-2">Song Name</Text>
                        <View className="flex-row items-center justify-between mr-2">
                            <TouchableOpacity>
                                <Feather name="play" size={24} className="p-2"/>
                            </TouchableOpacity>
                            <Text className="font-semibold p-2">00.00</Text>
                        </View>
                    </View>
                </View>
                    <Text className="text-white font-semibold text-2xl mb-1 ">Based on Recents</Text>
                <View className=" flex-row  h-36 items-center justify-between mb-3">
                    <View className=" flex  p-7 bg-gray-200 items-center justify-center rounded">
                        <Text>Playlist</Text>
                        <Text >1</Text>
                    </View>
                    <View className=" flex  p-7 bg-gray-200 items-center justify-center rounded">
                        <Text>Playlist</Text>
                        <Text >2</Text>
                    </View>
                    <View className="  flex p-7 bg-gray-200 items-center justify-center rounded">
                        <Text>Playlist</Text>
                        <Text >3</Text>
                    </View>
                </View>
                <Text className=" text-white font-semibold text-2xl mb-3" >Genres</Text>
                <View className=" flex-row items-center justify-around mb-3">
                    <View>
                        <View  className=" bg-gray-200 w-36 h-16 mb-3 items-center justify-center rounded-3xl ">
                            <Text className="text-black text-xl font-semibold"> Pop</Text>
                        </View>
                        <View  className=" bg-gray-200 w-36 h-16 mb-3 items-center justify-center rounded-3xl">
                            <Text className="text-black text-xl font-semibold"> Rnb</Text>
                        </View>
                    </View>
                    <View>
                        <View className=" bg-gray-200 w-36 h-16 mb-3 items-center justify-center rounded-3xl">
                            <Text className="text-black text-xl font-semibold"> Rap</Text>
                        </View>
                        <View className=" bg-gray-200 w-36 h-16 mb-3 items-center justify-center rounded-3xl">
                            <Text className="text-black text-xl font-semibold"> Rock</Text>
                        </View >
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;