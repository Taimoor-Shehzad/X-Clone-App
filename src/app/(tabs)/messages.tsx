import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CONVERSATIONS } from "../../../data/conversations";
import { useState } from "react";

const messages = () => {
  const [conversations, setConversation] = useState(CONVERSATIONS);
  const [searchText, setSearchText] = useState("");

  return (
    <View className="bg-white pt-12 flex-1">
      <View className="flex-row px-5 justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Messages</Text>
        <Feather name="edit" size={24} color="#1DA1F2" />
      </View>
      <View className="py-4 border-t border-b px-5 border-t-gray-100 border-b-gray-100">
        <View className="w-full bg-gray-100 rounded-full px-4 flex-row items-center gap-1">
          <Ionicons name="search" size={20} color={"#657786"} />
          <TextInput
            className="w-full color-black"
            placeholder="Search Twitter"
            placeholderTextColor={"#657786"}
            onChangeText={setSearchText}
            value={searchText}
          />
        </View>
      </View>
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
      >
        {conversations.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row px-5 py-4 w-full gap-3 items-center border-b border-b-gray-100"
          >
            <Image
              contentFit="cover"
              source={item.user.avatar}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-1 items-center">
                  <Text className="text-lg font-bold">{item.user.name}</Text>
                  {item.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )}

                  <Text className="text-sm text-gray-500">
                    @{item.user.username}
                  </Text>
                </View>
                <Text className="text-sm text-gray-500">{item.time}</Text>
              </View>
              <Text className="text-sm text-gray-500" numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <Text className="text-xs text-gray-500 text-center">
          Tap to open • Long press to delete
        </Text>
      </View>
    </View>
  );
};

export default messages;
