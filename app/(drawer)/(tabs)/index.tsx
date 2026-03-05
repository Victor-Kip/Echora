import { Feather } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React from 'react';
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const openDrawer = ()=>{
        navigation.dispatch(DrawerActions.openDrawer())
    };
    const songs = [
        {id:'1',name:'Life on'},
        {id:'2',name:'Today'},
        {id:'3',name:'Heal the world'},
    ]
    const playlist = [
        {id:'1',name:'Playlist 1'},
        {id:'2',name:'Playlist 2'},
        {id:'3',name: 'Playlist 3'},
    ]
    return (
        <SafeAreaView className = "flex-1 bg-primary ">
            <ScrollView className="px-6 pt-4">
                <View className="flex-row items-center justify-between mb-8 mt-2">
                    <View>
                    <Text className="text-white font-bold text-3xl">Wavrr</Text>
                    <Pressable onPress={openDrawer}>
                    <Feather name="menu" size={24} color="white" />
                </Pressable>
                    </View>
                    <TextInput
                    placeholder={"Search for a song ..."}
                    placeholderTextColor="gray"
                    className=" bg-gray-100 rounded-xl p-4 border-2 border-blue-300 mr-2 "
                    />
                </View>
                <View>
                    <Text className="text-white font-semibold text-2xl mb-2">Recently Played</Text>
                    {songs.map((item)=>(
                    <TouchableOpacity
                    key={item.id}
                    onPress={() => router.push('../songs/1')}
                     className="bg-whiteview p-2 flex flex-row items-center justify-between rounded border mb-3">
                        <Text className="text-indi font-semibold text-xl p-2">{item.name}</Text>
                        <View className="flex-row items-center justify-between mr-2">
                            <TouchableOpacity>
                            <Feather name="play" size={24} className="p-2" color={'#3730a3'}/>
                            </TouchableOpacity>
                            <Text className=" text-indi font-semibold p-2">00.00</Text>
                        </View>
                    </TouchableOpacity>))} 
                </View>
                    <Text className="text-white font-semibold text-2xl mb-1 ">Based on Recents</Text>
                <View className=" flex-row  h-36 items-center justify-between mb-3">
                    {playlist.map((item)=>(
                    <View  key={item.id} className=" flex h-24 p-7 bg-whiteview items-center justify-center rounded">
                        <Text className="text-indi">Playlist 1</Text>
                    </View>
                    ))}
                </View>
                <Text className=" text-white font-semibold text-2xl mb-3" >Genres</Text>
                <View className=" flex-row items-center justify-around mb-3">
                    <View>
                        <View  className=" bg-whiteview w-36 h-16 mb-3 items-center justify-center rounded-3xl ">
                            <Text className="text-indi text-xl font-semibold"> Pop</Text>
                        </View>
                        <View  className=" bg-whiteview w-36 h-16 mb-3 items-center justify-center rounded-3xl">
                            <Text className="text-indi text-xl font-semibold"> Rnb</Text>
                        </View>
                    </View>
                    <View>
                        <View className=" bg-whiteview w-36 h-16 mb-3 items-center justify-center rounded-3xl">
                            <Text className="text-indi text-xl font-semibold"> Rap</Text>
                        </View>
                        <View className=" bg-whiteview w-36 h-16 mb-3 items-center justify-center rounded-3xl">
                            <Text className="text-indi text-xl font-semibold"> Rock</Text>
                        </View >
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;