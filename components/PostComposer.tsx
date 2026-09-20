import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCreatePost } from "../hooks/useCreatePost";
import { useUser } from "@clerk/expo";

const PostComposer = () => {
  const {
    content,
    setContent,
    selectedImage,
    removeImage,
    takePhoto,
    pickImageFromGallery,
    isCreating,
    createPost,
  } = useCreatePost();

  const { user } = useUser();

  return (
    <View className="w-full gap-2 mt-4 px-1 border-b border-b-gray-100">
      <View className="flex-row justify-start items-center gap-3">
        <Image
          source={{ uri: user?.imageUrl }}
          className="size-12 rounded-full"
          resizeMode="cover"
        />
        <TextInput
          placeholder="What's happening?"
          className="w-full"
          maxLength={280}
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>

      {selectedImage && (
        <View className="mt-3">
          <View className="relative">
            <Image
              source={{
                uri: selectedImage,
              }}
              className="w-full h-48 rounded-2xl"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full items-center justify-center"
              onPress={removeImage}
            >
              <Feather name="x" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className="flex-row w-full justify-between items-center mb-3">
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={takePhoto}>
            <Ionicons name="camera" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromGallery}>
            <Ionicons name="image" size={20} color="#1DA1F2" />
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-2 items-center">
          {content.length > 0 && (
            <Text
              className={`text-sm mr-3 ${content.length > 260 ? "text-red-500" : "text-gray-500"}`}
            >
              {280 - content.length}
            </Text>
          )}

          <TouchableOpacity
            className={`px-6 py-2 rounded-full ${
              content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300"
            }`}
            onPress={createPost}
            disabled={isCreating || !(content.trim() || selectedImage)}
          >
            {isCreating ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                className={`font-semibold ${
                  content.trim() || selectedImage
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                Post
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostComposer;
