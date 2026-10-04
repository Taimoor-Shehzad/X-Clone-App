import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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

const messages = () => {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [searchText, setSearchText] = useState("");
  const [isChatOpen, setChatOpen] = useState(false);
  // const [selectedConversation, setSelectedConversation] =
  //   useState<null | ConversationType>(null);
  const [userIds, setUserIds] = useState({
    from: "",
    to: "",
  });
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const { currentUser } = useCurrentUser();
  const [newMessage, setNewMessage] = useState("");

  const insets = useSafeAreaInsets();

  const {
    Users,
    isLoading: isUsersLoading,
    error: userLoadingError,
    refetch: refetchUsers,
  } = useUsers();

  if (isUsersLoading) {
    return (
      <View className="bg-white items-center justify-center flex-1 p-8">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
        <Text className="text-lg text-gray-500">Loading Users...</Text>
      </View>
    );
  }

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

  const openChatModel = (toUserId: string, targetUser: User) => {
    setChatOpen(true);
    setUserIds({
      to: toUserId,
      from: currentUser._id,
    });
    setTargetUser(targetUser);
  };
  const closeChatModel = () => {
    setChatOpen(false);
    setUserIds({
      to: "",
      from: "",
    });
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
          <TouchableOpacity
            key={user._id}
            className="flex-row px-5 py-4 w-full gap-3 items-center border-b border-b-gray-100"
            onPress={() => {
              openChatModel(user._id, user);
            }}
            // onLongPress={() => {
            //   deleteConversation(item.id);
            // }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: user.profilePicture }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between items-center">
                <Text className="flex-row gap-1 w-full items-center leading-tight">
                  <Text className="text-lg font-bold  leading-tight">
                    {user.firstName} {user.lastName}
                  </Text>
                  {/* {item.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )} */}

                  <Text className="text-sm text-gray-500  leading-tight">
                    {" "}
                    @{user.username}
                  </Text>
                </Text>
                {/* <Text className="text-sm text-gray-500">{item.time}</Text> */}
              </View>
              <Text className="text-sm text-gray-500" numberOfLines={1}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quos, ipsam nihil tenetur voluptate architecto eum reprehenderit
                velit quae quo deleniti debitis reiciendis tempora nesciunt
                tempore, numquam, expedita distinctio molestiae.
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <MessageModal
        isVisible={isChatOpen}
        onClose={() => closeChatModel()}
        userIds={userIds}
        targetUser={targetUser}
      />
    </View>
  );
};

export default messages;
