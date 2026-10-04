import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { CONVERSATIONS, ConversationType } from "../../../data/conversations";
import { useUsers } from "../../../hooks/useUsers";
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { User } from "../../../types/types";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import MessageModal from "../../../components/MessageModal";
import UserCard from "../../../components/UserCard";

const messages = () => {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [searchText, setSearchText] = useState("");
  const [isChatOpen, setChatOpen] = useState(false);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const { currentUser, isUserLoading } = useCurrentUser();
  const [newMessage, setNewMessage] = useState("");
  const insets = useSafeAreaInsets();

  const {
    Users,
    isLoading: isUsersLoading,
    error: userLoadingError,
    refetch: refetchUsers,
  } = useUsers();

  if (userLoadingError) {
    return (
      <View className="flex-1 bg-white w-full justify-center items-center gap-4 p-8">
        <Text className="text-gray-500 text-lg">
          Failed to load notifications
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => {
            refetchUsers();
          }}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isUsersLoading || isUserLoading) {
    return (
      <View className=" bg-white flex-1 justify-center">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
      </View>
    );
  }

  const openChatModel = (targetUser: User) => {
    setChatOpen(true);
    setTargetUser(targetUser);
  };
  const closeChatModel = () => {
    setChatOpen(false);
  };

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
        {Users.map((user: User) => (
          <UserCard key={user._id} user={user} openChatModel={openChatModel} />
        ))}
      </ScrollView>
      <MessageModal
        isVisible={isChatOpen}
        onClose={() => closeChatModel()}
        targetUser={targetUser}
      />
    </View>
  );
};

export default messages;
