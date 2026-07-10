import CreatePostModal from "@/components/connect/createPostModal";
import PostCard from "@/components/connect/postcard";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";
import Post from "../types/post";
import RawPostFromBackend from "../types/rawPostFromBackend";
const Connect = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("For You");
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  //get all the posts
  const handleGetFeed = async () => {
    try {
      const response = await api.get("/posts/feed");
      const responseData = response.data;
      const rawPost = responseData.data as RawPostFromBackend[];
      console.log(responseData);
      const transformedPosts: Post[] = rawPost.map((rawPost) => ({
        id: rawPost.id,
        content: rawPost.content,

        author: {
          username:
            rawPost.userAuthor?.username ||
            rawPost.artistAuthor?.username ||
            "unknown",
          role: rawPost.authorType || "user",
        },
        post_type: rawPost.type as "text" | "poll",
        authorId: rawPost.authorId,
        is_pinned: rawPost.is_pinned,
        like_count: rawPost.like_count,
        comment_count: rawPost.comment_count,
        share_count: rawPost.share_count,
        poll_options: rawPost.poll_options,
        poll_votes: rawPost.poll_votes,
        createdAt: rawPost.createdAt,
        updatedAt: rawPost.updatedAt,
      }));
      setPosts(transformedPosts);
    } catch (err) {
      console.error(`Error getting posts : ${err}`); //
    }
  };
  useEffect(() => {
    handleGetFeed();
  }, []);
  //create a post
  const handleCreatePost = async (postData: any) => {
    try {
      const response = await api.post("posts", postData);
      const { responsedata } = response.data;
    } catch (err) {
      console.error(`Error creating post : ${err}`);
    }

    console.log(`Post created!`, postData);
    setIsCreatePostVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
        ListHeaderComponent={
          <>
            {/*App and page title*/}
            <View className="flex-row items-center justify-between mb-6 mt-2">
              <Text className="text-white font-bold text-3xl">Echora</Text>
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-2xl">Connect</Text>
                <Feather
                  name="link"
                  size={24}
                  color="#3b82f6"
                  className=" bg-white rounded-full p-2 mx-3 border border-2 border-blue-500"
                />
              </View>
            </View>
            {/*search input*/}
            <View className="mb-4">
              <TextInput
                placeholder="Search for friends"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="bg-gray-100 rounded-xl p-4 border border-blue-300 text-black"
              />
            </View>
            {/*navigation and profile action.*/}
            <View className="flex-row items-center justify-between mb-6 ">
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => setIsCreatePostVisible(true)}
                  className="mr-2 p-3 rounded-lg bg-blue-500"
                >
                  <Text className="text-white font-semibold">Create Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveFilter("Following")}
                  className={`mr-2 p-3 rounded-lg ${activeFilter == "Following" ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  <Text
                    className={`${activeFilter == "Following" ? "text-white font-semibold" : "text-black font-semibold "}`}
                  >
                    Following
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveFilter("For You")}
                  className={` p-3 rounded-lg ${activeFilter == "For You" ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  <Text
                    className={`${activeFilter == "For You" ? "text-white font-semibold" : "text-black font-semibold "}`}
                  >
                    For You
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Feather
                  name="user"
                  size={24}
                  color="black"
                  className=" p-2 bg-white rounded-full "
                />
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <CreatePostModal
        visible={isCreatePostVisible}
        onClose={() => setIsCreatePostVisible(false)}
        onSubmit={handleCreatePost}
      />
    </SafeAreaView>
  );
};
export default Connect;
