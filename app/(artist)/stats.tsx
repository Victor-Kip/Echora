import React from 'react'
import {Text,View} from 'react-native'
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";

const Stats = () =>{
    return (
        <View className="flex-1 ">
            <Text className="text-white text-2xl font-bold">Stats </Text>
            <View className='bg-gray-100 rounded-2xl p-5 mb-4  '>
                <View className='flex-row justify-between items-center mb-4'>
                    <View className='flex-row items-center'>
                        <View className='bg-indigo-300 p-3 rounded-full mr-3'>
                            <Feather name="play" size={24} color="white" className='ml-1'/>
                        </View>
                        <Text className='text-indigo-900 font-bold text-lg'>Total Plays</Text>
                    </View>
                    <Text className='text-indigo-900 font-bold text-2xl'>0</Text>
                </View>
                <View className='flex-row justify-between items-end mt-2'>
                    <View>
                        <Text className='text-indigo-900 font-bold text-lg'>Recent Plays</Text>
                        <Text className='text-indigo-900 text-sm '>(Last 7 days)</Text>
                    </View>
                    <View className='flex-row items-end justify-between gap-1 h-16'>
                        {[10, 15, 12, 20, 25, 30, 28, 35].map((h,i) =>(
                            <View key={i} style={{height:h,width:12}} className='bg-indigo-900 rounded-t-sm opacity-50'></View>
                        ))}
                    </View>
                </View>
                <Text className=' text-right text-indigo-400 text-sm mt-4'>30 listeners</Text>
            </View>
            <View className='bg-gray-100 rounded-2xl p-5 mb-6  '>
                <View className='flex-row justify-between items-center mb-4'>
                    <View className='flex-row items-center'>
                        <View className='bg-indigo-300 p-3 rounded-full mr-3'>
                            <MaterialCommunityIcons name="comment-outline" size={24} color="white" className='ml-1'/>
                        </View>
                        <Text className='text-indigo-900 font-bold text-lg'>Comments received</Text>
                    </View>
                    <Text className='text-indigo-900 font-bold text-2xl'>0</Text>
                </View>
                <View className="flex-row items-end gap-1 h-12 w-full">
                    <View className="flex-1 flex-row items-end justify-between px-2 h-full">
                        {[ 20, 25, 30, 28, 35, 32, 40].map((h, i) => (
                            <View key={i} style={{ height: h, width: 12 }} className="bg-indigo-900 rounded-t-sm opacity-50" />
                        ))}
                    </View>
                </View>
            </View>
            <Text className="text-white text-xl font-bold mb-4">Followers</Text>
            <View className='bg-gray-100 rounded-2xl p-5 mb-10 '>
                <View className='flex-row justify-between items-start'>
                    <View className='flex-row items-center'>
                        <View className='bg-indigo-300 p-3 rounded-full mr-3'>
                            <Feather name="users" size={24} color="white" className='ml-1'/>
                        </View>
                        <Text className='text-indigo-900 font-bold text-lg'>Total Followers</Text>
                    </View>
                    <View className='items-end'>
                        <Text className='text-indigo-900 font-bold text-2xl'>0</Text>
                    </View>
                </View>
                <View className=' flex-row justify-between mt-4 items-end'>
                    <View>
                        <Text className='text-indigo-900 font-bold text-lg'>Recent Followers</Text>
                        <Text className='text-indigo-900 text-sm '>(Last 7 days)</Text>
                    </View>
                    <View className='flex-row items-end justify-between gap-1 h-16'>
                        {[5,7,11,19,20,23,33].map((h,i) =>(
                            <View key={i} style={{height:h,width:14}} className='bg-indigo-900 rounded-t-sm opacity-50'></View>
                        ))}
                    </View>
                </View>
                <Text className=' text-right text-indigo-400 text-sm mt-4'>0 new followers</Text>
            </View>
        </View>

    )
}
export default Stats;