import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth";

export default function Account() {
  const { user } = useAuth();
  return (
    <SafeAreaView className="p-4 flex-1 bg-primary">
      <View className=" flex-row bg-white w-full py-8 mt-2 justify-evenly items-center rounded-md border border-tabbtn">
        <View className="w-28 h-28 bg-black rounded-full"></View>
        <View>
          <Text className=" text-2xl font-bold">Account details</Text>
          <Text className=" text-lg font-semibold">
            Username:{user?.username || "N/A"}
          </Text>
          <Text className=" text-lg font-semibold">
            Email:{user?.email || "N/A"}
          </Text>
          <TouchableOpacity className="border border-tabbtn self-start px-2 mt-2  rounded-md">
            <Text className="text-md">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
