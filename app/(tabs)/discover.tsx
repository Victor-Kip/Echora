import React from "react";
import {ScrollView, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Feather} from "@expo/vector-icons";
import {Dropdown} from "react-native-element-dropdown"

const styles = StyleSheet.create({
    dropdown:{
        padding:14,
        height:50,
        borderColor:'#4c75ea',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#e5e7eb',
        width:"50%",

    },
    listContainer: {
        backgroundColor:'#99a1af',
        borderRadius:7,
    },
    itemContainer:{
        backgroundColor:'white',
        padding:2,
        margin:1
    },
    itemText:{
        fontSize:16,
        color: '#1c398e',
        fontWeight:'bold'
    },
    placeholder:{
        color:'#060a17',
        fontSize:16,
        fontWeight:'bold',
    },
    selectedText:{
        fontSize:16,
        color: '#1c398e',
        fontWeight:'bold'
    }
    }
)

const options = [
    {label:"Genre",value:"Genre"},
    {label:"Liked Songs",value:"Liked Songs"},
    {label:"Recently Played",value:"Recently Played"},
    {label:"Friends",value:"Friends"}
]

const Discover = ()=>{
    return(
        <SafeAreaView className = "flex-1 bg-indigo-900 ">
            <ScrollView className="px-6 pt-4">
                <View className="flex-row items-center justify-between mb-8 mt-2">
                    <Text className="text-white font-bold text-3xl">Wavrr</Text>
                    <View className="flex-row items-center">
                        <Text className="text-white font-bold text-2xl">Discover</Text>
                        <Feather name="compass" size={24} color = "white" className=" p-2 mr-4 " />
                    </View>
                </View>
                <View>
                <Text className="text-white font-semibold text-2xl mb-2">New songs for You</Text>
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
                        onChange={item=>console.log(item)}
                    />
                    <View>
                        <View className="mt-8 bg-gray-200 p-2 flex flex-row items-center justify-between rounded border mb-3">
                            <Text className="text-black font-semibold text-xl p-2">Song Name</Text>
                            <View className="flex-row items-center justify-between mr-2">
                                <TouchableOpacity>
                                    <Feather name="play" size={24} className="p-2"/>
                                </TouchableOpacity>
                                <Text className="font-semibold p-2">00.00</Text>
                            </View>

                        </View>
                        <View className="mt-8 bg-gray-200 p-2 flex flex-row items-center justify-between rounded border mb-3">
                            <Text className="text-black font-semibold text-xl p-2">Song Name</Text>
                            <View className="flex-row items-center justify-between mr-2">
                                <TouchableOpacity>
                                    <Feather name="play" size={24} className="p-2"/>
                                </TouchableOpacity>
                                <Text className="font-semibold p-2">00.00</Text>
                            </View>

                        </View>
                        <View className="mt-8 bg-gray-200 p-2 flex flex-row items-center justify-between rounded border mb-3">
                            <Text className="text-black font-semibold text-xl p-2">Song Name</Text>
                            <View className="flex-row items-center justify-between mr-2">
                                <TouchableOpacity>
                                    <Feather name="play" size={24} className="p-2"/>
                                </TouchableOpacity>
                                <Text className="font-semibold p-2">00.00</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Discover;