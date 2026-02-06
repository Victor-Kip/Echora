import React from "react";
import {Text, View,TouchableOpacity} from 'react-native';
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";

const Earnings = () => {
    return (
        <View className="flex-1  ">
            <Text className="text-white text-2xl font-bold">Earnings </Text>
            <View className='bg-gray-100 rounded-xl p-4 flex-row justify-between items-center mb-4 mt-1'>
                <Text className='text-indigo-900 text-xl font-semibold'>Total Earnings</Text>
                <Text className='text-indigo-900 font-bold text-2xl '>$0.00</Text>
            </View>
            <View className='bg-gray-100 rounded-xl p-4 mb-4'>
                <View className='flex-row justify-between items-start mb-2'>
                    <View>
                        <Text className='text-indigo-900 font-semibold text-lg '>Recent Earnings</Text>
                        <Text className='text-indigo-900 text-sm '>(Last 7 days)</Text>
                    </View>
                    <Text className='text-indigo-900 font-bold text-2xl '>$0.00</Text>
                </View>
                <View className='h-16 w-full justify-end'>
                    <View className='flex-row items-end justify-between h-full px-1'>
                        {[20, 25, 22, 30, 35, 45, 40, 50].map((h,i) =>(
                            <View key={i} style={{height:h,width:23}} className='bg-indigo-900 rounded-t-sm opacity-50'></View>
                        ))}
                    </View>
                    <View className='border-b border-indigo-300 w-full'/>
                </View>
            </View>
            <View className='bg-gray-100 rounded-xl p-4 flex-row justify-between items-center mb-4'>
                <View className='flex-row items-center'>
                    <MaterialCommunityIcons name = 'wallet-outline' size={24} color="indigo"  className='mr-2'/>
                    <Text className='text-indigo-900 text-lg font-semibold'>Pending Payout</Text>
                </View>
                <Text className='text-indigo-900 font-bold text-2xl '>$0.00</Text>
            </View>
            <TouchableOpacity className=' flex-row bg-blue-300 py-4 rounded-xl justify-center items-center mt-2 mb-8'>
                <Text className='text-white font-bold text-lg mr-2'>Withdraw Funds</Text>
                <Feather name="arrow-right" size={20} color="white" className='mt-1'/>
            </TouchableOpacity>
            <View className='flex-row items-center justify-between mb-4'>
                <Text className='text-white font-bold text-xl'>Payout History</Text>
            </View>
            {[
                {amount:'$0.00',date:'Jan 1, 2024' },
                {amount:'$0.00',date:'Dec 25, 2023' },
                {amount:'$0.00',date:'Dec 18, 2023'},
            ].map((payout, index) => (
                <View key={index} className='bg-gray-100 rounded-xl p-4  items-center mb-4'>
                    <View className='flex-row justify-between mb-1'>
                        <Text className='text-lg font-bold text-indigo-900'>{payout.amount}</Text>
                        <Text className='text-indigo-900 text-lg ml-4'>{payout.date}</Text>
                    </View>
                    <Text className='text-indigo-400 text-sm'>Deposited to bank account</Text>
                </View>
            ))}
            <TouchableOpacity className=' flex-row justify-end items-center py-4 mb-10'>
                <Text className='text-white font-semibold mr-1'>View all </Text>
                <Feather name="chevron-right" size={16} color="white" className='mt-1'/>
            </TouchableOpacity>
        </View>
    )
}
export default Earnings