import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../types/types";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { getMessages } from "../convex/messages";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { timeAgo } from "../utils/formatter";
import { Id } from "../convex/_generated/dataModel";
import { router } from "expo-router";

interface MessageModalProps {
  isVisible: boolean;
  onClose: () => void;
  targetUser: User | null;
}
const MessageModal = ({
  isVisible,
  onClose,
  targetUser,
}: MessageModalProps) => {
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = useMutation(api.messages.sendMessage);
  const deleteMessage = useMutation(api.messages.deleteMessage);
  const { currentUser, isUserLoading } = useCurrentUser();

  const messages = useQuery(
    api.messages.getMessages,
    currentUser && targetUser
      ? {
          to: targetUser?._id || "",
          from: currentUser._id,
        }
      : "skip",
  );

  const handleDeleteMesage = (id: Id<"messages">) => {
    Alert.alert("Delete Message", "Do you want to delete this message?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteMessage({ id });
        },
      },
    ]);
  };

  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
      style={{
        marginTop: 70 + insets.top,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 10,
      }}
    >
      {(isUserLoading || !currentUser || !targetUser) && (
        <View className="flex-1 w-full justify-center items-center p-8">
          <ActivityIndicator size={"large"} color={"#1DA1F2"} />
        </View>
      )}
      {currentUser && targetUser && (
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-row items-center gap-3 border-b border-b-gray-100 pb-4 mt-2">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" color="#1DA1F2" size={26} />
            </TouchableOpacity>
            <Image
              source={{ uri: targetUser.profilePicture }}
              style={{
                height: 37,
                width: 37,
                borderRadius: 18.5,
                overflow: "hidden",
              }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(screens)/userProfile",
                  params: { username: targetUser.username },
                });
              }}
            >
              <View className="justify-start">
                <Text className="text-lg font-bold leading-tight">
                  {targetUser.firstName}
                </Text>
              </View>
              <Text className="text-base text-gray-500 leading-tight justify-center items-center">
                @{targetUser.username}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 px-4 py-4"
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <Text className="text-center mt-2 text-gray-500 text-sm mb-4">
              This is the beginning of your conversation with{" "}
              {targetUser.firstName}
            </Text>
            {messages &&
              messages.map((message) => (
                <View
                  className={`flex-row mb-3 ${message.from === currentUser._id ? "justify-end" : "justify-start"} gap-2 items-start`}
                  key={message._id}
                >
                  {message.from !== currentUser._id && (
                    <Image
                      source={{ uri: targetUser.profilePicture }}
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        overflow: "hidden",
                      }}
                      resizeMode="cover"
                    />
                  )}
                  <View
                    className={`flex-1 ${message.from === currentUser._id ? "items-end" : "items-start"}`}
                  >
                    <View
                      className={`rounded-2xl px-4 py-3 max-w-xs ${
                        message.from === currentUser._id
                          ? "bg-blue-500"
                          : "bg-gray-100"
                      }`}
                    >
                      {message.from === currentUser._id ? (
                        <TouchableOpacity
                          onLongPress={() => handleDeleteMesage(message._id)}
                        >
                          <Text
                            className={
                              message.from === currentUser._id
                                ? "text-white"
                                : "text-gray-900"
                            }
                          >
                            {message.text}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <Text
                          className={
                            message.from === currentUser._id
                              ? "text-white"
                              : "text-gray-900"
                          }
                        >
                          {message.text}
                        </Text>
                      )}
                    </View>
                    <Text className="text-xs text-gray-500 mt-1 mr-1">
                      {timeAgo(message._creationTime)}
                    </Text>
                  </View>
                </View>
              ))}
          </ScrollView>
          <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
            <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-3">
              <TextInput
                className="flex-1 text-base"
                placeholder="Send a message..."
                placeholderTextColor="#657786"
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
              />
            </View>
            <TouchableOpacity
              className={`size-10 rounded-full items-center justify-center ${
                newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
              }`}
              disabled={!newMessage.trim()}
              onPress={() => {
                sendMessage({
                  to: targetUser._id,
                  text: newMessage.trim(),
                  from: currentUser._id,
                });
                setNewMessage("");
              }}
            >
              <Feather name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Modal>
  );
};

export default MessageModal;
