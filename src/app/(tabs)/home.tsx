import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LogoutButton from "../../../components/LogoutButton";
import { useUserSync } from "../../../hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "../../../components/PostComposer";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const [commentsOpened, setCommentsOpened] = useState(false);
  const insets = useSafeAreaInsets();
  useUserSync();
  return (
    <View className="bg-white flex-1 justify-start items-center px-3 py-3">
      {/* {*Header} */}
      <View className="flex-row justify-between w-full mt-10">
        <Image
          source={require("@/assets/images/twitter.png")}
          className="size-8"
          resizeMode="cover"
        />

        <Text className="font-bold text-2xl">Home</Text>
        <LogoutButton />
      </View>
      {/* {Post Composer} */}
      <PostComposer />
      {/* {Posts} */}
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
      >
        {/* Post */}
        <View className="px-1 border-b py-3 border-b-gray-100">
          <View className="flex-row gap-3">
            <Image
              source={{
                uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
              }}
              className="size-12 rounded-full"
              resizeMode="cover"
            />
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-1 items-center">
                  <Text className="text-lg font-extrabold leading-tight">
                    John
                  </Text>
                  <Text className="text-sm text-gray-500">@JohnDoe</Text>
                  <Text className="text-sm text-gray-500"> . </Text>
                  <Text className="text-sm text-gray-500">1h</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="trash" size={20} color="gray" />
                </TouchableOpacity>
              </View>
              <Text className="mr-1">Nice Place To Visit!</Text>
              <View className="w-full rounded-2xl aspect-16/10 overflow-hidden mt-4">
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlw4Xp44bTv0ALCgfK7nlVz84CNYcnh2OCcE3f9nkeBaGkQw-YsBuV2AU3&s=10",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-row mt-2.5 justify-between mr-5">
                <TouchableOpacity className="flex-row justify-center items-center">
                  <Ionicons name="heart-outline" color="gray" size={16} />
                  <Text className="text-sm ml-1" style={{ color: "gray" }}>
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row justify-center items-center"
                  onPress={() => {
                    setCommentsOpened(true);
                  }}
                >
                  <Ionicons name="chatbox-outline" color="gray" size={16} />
                  <Text className="text-sm ml-1" style={{ color: "gray" }}>
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-center items-center">
                  <Ionicons name="repeat-outline" color="gray" size={16} />
                  <Text className="text-sm ml-1" style={{ color: "gray" }}>
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-center items-center">
                  <Ionicons name="share-outline" color="gray" size={16} />
                  <Text className="text-sm ml-1" style={{ color: "gray" }}>
                    0
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Comment MOdel */}
      <Modal
        visible={commentsOpened}
        presentationStyle="pageSheet"
        animationType="slide"
        style={{
          marginTop: 70 + insets.top,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          padding: 10,
        }}
      >
        {/* Comment Model Header */}
        <View className="w-full flex-row items-center justify-center relative mb-2">
          <TouchableOpacity
            className="absolute left-0 z-10"
            onPress={() => {
              setCommentsOpened(false);
            }}
          >
            <Text className="text-blue-500">Close</Text>
          </TouchableOpacity>

          <Text className="font-bold text-lg">Comments</Text>
        </View>
        {/* Comment Post */}
        <View className="px-1 border-b border-t py-3 border-b-gray-100 border-t-gray-100">
          <View className="flex-row gap-3">
            <Image
              source={{
                uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
              }}
              className="size-12 rounded-full"
              resizeMode="cover"
            />
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-1 items-center">
                  <Text className="text-lg font-extrabold leading-tight">
                    John
                  </Text>
                  <Text className="text-sm text-gray-500">@JohnDoe</Text>
                </View>
              </View>
              <Text className="mr-1">Nice Place To Visit!</Text>
              <View className="w-full rounded-2xl aspect-16/10 overflow-hidden mt-4">
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlw4Xp44bTv0ALCgfK7nlVz84CNYcnh2OCcE3f9nkeBaGkQw-YsBuV2AU3&s=10",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        </View>
        {/* Comments */}
        <View className="px-1 border-b py-3 border-b-gray-100">
          <View className="flex-row gap-3">
            <Image
              source={{
                uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
              }}
              className="size-12 rounded-full"
              resizeMode="cover"
            />
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-1 items-center">
                  <Text className="text-lg font-extrabold leading-tight">
                    John
                  </Text>
                  <Text className="text-sm text-gray-500">@JohnDoe</Text>
                </View>
              </View>
              <Text className="mr-1">Nice Pic!</Text>
            </View>
          </View>
        </View>
        {/* Comment Input */}
        <View className="px-1 border-b py-3 border-b-gray-100 w-full">
          <View className="flex-row gap-3">
            <Image
              source={{
                uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
              }}
              className="size-12 rounded-full"
              resizeMode="cover"
            />
            <View className="flex-1 gap-3">
              <TextInput
                placeholder="Write Comment"
                className="px-4 py-2 border rounded-lg border-gray-300"
              />
              <TouchableOpacity className="items-center self-start justify-center px-4 py-1 rounded-lg bg-gray-200">
                <Text className="text-gray-600 font-bold text-lg">Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
