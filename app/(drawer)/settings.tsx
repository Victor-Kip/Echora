import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../../context/auth";

export default function Settings() {

     const {signOut} = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-indigo-900 pt-4 px-6">
            <View className = " items-center justify-center">
            <TouchableOpacity className='  w-[40%] items-center justify-center  bg-red-500 rounded-2xl'
                onPress={signOut}>
                <Text className='text-white font-bold text-2xl py-4  '>Logout</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}