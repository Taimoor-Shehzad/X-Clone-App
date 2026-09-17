import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostComposer = () => {
  return (
    <View className="w-full gap-2 mt-4 px-1 border-b border-b-gray-100">
      <View className="flex-row justify-start items-center gap-3">
        <Image
          source={{
            uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
          }}
          className="size-12 rounded-full"
          resizeMode="cover"
        />
        <TextInput placeholder="What's happening?" className="w-full" />
      </View>
      <View className="flex-row w-full justify-between items-center mb-3">
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Ionicons name="camera" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="image" size={20} color="#1DA1F2" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="items-center justify-center px-4 py-1 rounded-full bg-gray-200">
          <Text className="text-gray-600 font-bold ">Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostComposer;
