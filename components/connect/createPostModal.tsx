import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}
interface creatPostData {
  content: string;
  post_type: "text" | "poll";
  poll_options?: {
    options: string[];
    votes: number[];
  };
}
const CreatePostModal: React.FC<CreatePostModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [postType, setPostType] = useState<"text" | "poll">("text");
  const [content, setContent] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  const handleCreate = () => {
    if (!content.trim()) return;
    const postData = {
      content,
      post_type: postType,
      poll_options:
        postType === "poll"
          ? {
              options: options.filter((o) => o.trim() !== ""),
              votes: options.map(() => 0),
            }
          : null,
    };

    onSubmit(postData);
    setContent("");
    setOptions(["", ""]);
    setPostType("text");
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View className="flex-row mb-6 border border-gray-700 rounded-xl overflow-hidden mt-4 mx-2">
        <TouchableOpacity
          style={{ elevation: 0 }}
          className={`w-[50%] py-3 items-center ${postType === "text" ? "bg-blue-500" : "bg-transparent"}`}
          onPress={() => setPostType("text")}
        >
          <Text
            className={`font-semibold ${postType === "text" ? "text-white" : "text-gray-400"}`}
          >
            Text
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ elevation: 0 }}
          className={`w-[50%] py-3 items-center ${postType === "poll" ? "bg-blue-500" : "bg-transparent"}`}
          onPress={() => setPostType("poll")}
        >
          <Text
            className={`font-semibold ${postType === "poll" ? "text-white" : "text-gray-400"}`}
          >
            Poll
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="What's on your mind?"
        placeholderTextColor="gray"
        value={content}
        onChangeText={setContent}
        className="bg-gray-100 rounded-xl p-4 h-28 text-black text-base mb-6"
        textAlignVertical="top"
        multiline
      />
      {postType === "poll" && (
        <View className="mb-6">
          {options.map((option, index) => (
            <TextInput
              key={index}
              placeholder={`Option ${index + 1}`}
              placeholderTextColor="gray"
              value={option}
              onChangeText={(text) => {
                const newOptions = [...options];
                newOptions[index] = text;
                setOptions(newOptions);
              }}
              className="bg-gray-100 rounded-xl p-3 text-black text-sm mb-3"
            />
          ))}
          <TouchableOpacity
            onPress={() => setOptions([...options, ""])}
            className="border border-dashed border-blue-400 py-3 rounded-xl items-center"
          >
            <Text className="text-blue-400 font-semibold">+ Add Option</Text>
          </TouchableOpacity>
        </View>
      )}
      <View className="flex-row justify-between space-x-4 mt-4 mx-2">
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 bg-gray-800 py-4 rounded-xl items-center"
        >
          <Text className="text-red-500 font-bold text-base">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCreate}
          className="flex-1 bg-blue-500 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-base">Post</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CreatePostModal;
