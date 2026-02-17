import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = ()=>{
    return(
        <SafeAreaView className="flex-1 bg-indigo-900 ">
            <ScrollView className="p-6 pt-4">
                <View className="flex-row justify-between items-center mb-6 mt-2">
                    <Text className="text-white font-bold text-3xl">Wavrr</Text>
                    <View className="flex-row items-center">
                        <Text className= "text-2xl text-white font-bold">Profile</Text>
                        <Feather name= "user" size={24} color = "white" className=" p-2 mr-4 " />
                    </View>
                </View>
                <View className="justify-center items-center" >
                <Text className="text-2xl text-white font-bold mb-2">Display name</Text>
                </View>
                <View className="justify-around items-center flex-row mt-4">
                    <View className=" justify-center items-center rounded-full w-32 h-32 bg-white"><Text>Profile</Text></View>
                    <View>
                        <Text className="text-white text-2xl">Gender</Text>
                        <Text className="text-white text-2xl">Bio</Text>
                        <TouchableOpacity className="flex-row items-center bg-gray-200 rounded px-4 py-2 mt-2">
                            <Feather name="play" size={16} color="gray" className="mr-1" />
                            <Text className="text-gray-400 ">Favourite music</Text>
                        </TouchableOpacity>
                        <View className="flex-row items-center justify-between">
                            <TouchableOpacity className="bg-blue-500 rounded px-4 py-2 mt-4">
                                <Text className="text-white font-bold">Follow</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-blue-500 rounded px-4 py-2 mt-4">
                                <Text className="text-white font-bold">Posts</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="flex-row p-4 justify-around items-center mt-6 ">
                    <View className="flex-row justify-between items-center bg-gray-400 rounded px-4 py-2">
                        <Text className="text-white text-1.5xl font-bold px-2">Followers</Text>
                        <Text className="text-white text-1.5xl font-bold">100</Text>
                    </View>
                    <View className="flex-row justify-between items-center bg-gray-400 rounded px-4 py-2">
                        <Text className="text-white text-1.5xl font-bold px-2">Following</Text>
                        <Text className="text-white text-1.5xl font-bold">150</Text>
                    </View>
                </View>
                <View className="border-t border-gray-200 my-2 mb-6" />
                <Text className="text-white text-2xl font-bold mb-4">Recently Played</Text>
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
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile;