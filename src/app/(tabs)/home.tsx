import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LogoutButton from "../../../components/LogoutButton";
import { useUserSync } from "../../../hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
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
      {/* {Post Creation} */}
      <View className="w-full gap-2 m-4 border-b px-1 border-b-gray-100">
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
      {/* {Posts} */}
      <ScrollView className="flex-1 w-full">
        {/* Post */}
        <View className="px-1">
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
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwJZ--FYj__GWp7SFgFGHENbTarf35S807h6LEtkoWB4CH1Lgmn6Ry0Xc&s=10",
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
                <TouchableOpacity className="flex-row justify-center items-center">
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
    </View>
  );
}
