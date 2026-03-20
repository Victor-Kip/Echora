import { useMusic } from "@/context/musicContext";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Playback = () => {
  const { currentSong, isPlaying, status, tooglePlayPause, playSong } =
    useMusic();
  if (!currentSong) return <Text>No song selected</Text>;
  const progress =
    status?.duration > 0 ? (status.currentTime / status.duration) * 100 : 0;
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="px-6 pt-4">
        <View className="flex-row items-center justify-between mb-8 mt-2">
          <Text className="text-white font-bold text-3xl">Wavrr</Text>
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-2xl">Playback</Text>
            <Feather
              name="music"
              size={24}
              color="black"
              className=" bg-white rounded-full p-2 mx-3 border border-2 border-blue-500"
            />
          </View>
        </View>
        <Text className="text-white text-2xl font-bold mb-1">
          {currentSong?.name}
        </Text>
        <Text className="text-gray-300 text-lg mb-2">
          {currentSong?.artist}
        </Text>
        <View className="w-[100%] h-[250px] bg-white rounded justify-center items-center">
          <Text className="text-gray-800 text-base">Album Art Placeholder</Text>
        </View>
        <View className=" justify-center items-center mt-4">
          <View className="justify-center items-center mt-6">
            <View className="h-1.4 w-[90%] bg-gray-600 rounded-full overflow-hidden">
              <View
                className="h-1.4 bg-black"
                style={{ width: `${progress}%` }}
              ></View>
            </View>
          </View>
          <View className="flex-row items-center justify-between w-[90%] mt-2">
            <TouchableOpacity>
              <Feather name="shuffle" size={24} color="white" className="p-2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="heart" size={24} color="white" className="p-2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name="skip-back"
                size={24}
                color="white"
                className="p-2"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name={isPlaying ? "pause" : "play"}
                size={32}
                color="white"
                className="p-2"
                onPress={() => {
                  if (currentSong?.id === currentSong?.id) {
                    tooglePlayPause();
                  } else {
                    playSong(currentSong);
                  }
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name="skip-forward"
                size={24}
                color="white"
                className="p-2"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="repeat" size={24} color="white" className="p-2" />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-white text-2xl font-bold mb-1">Lyrics</Text>
        <View className=" relative self-center bg-white/90 w-[100%] h-[250px] rounded mt-2">
          <Feather
            name="share-2"
            size={20}
            color="black"
            className="absolute top-2 right-2"
          />
          <ScrollView className="p-4">
            <Text className="text-gray-800 text-base mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text className="text-gray-800 text-base mb-2">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </Text>
            <Text className="text-gray-800 text-base mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Playback;
