import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { CONVERSATIONS, ConversationType } from "../../../data/conversations";

const messages = () => {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [searchText, setSearchText] = useState("");
  const [isChatOpen, setChatOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<null | ConversationType>(null);
  const [newMessage, setNewMessage] = useState("");

  const insets = useSafeAreaInsets();

  const openChatModel = (conversations: ConversationType) => {
    setChatOpen(true);
    setSelectedConversation(conversations);
  };
  const closeChatModel = () => {
    setChatOpen(false);
    setSelectedConversation(null);
  };

  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversations((prev) =>
              prev.filter((conv) => conv.id !== conversationId),
            );
          },
        },
      ],
    );
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv,
        ),
      );
      setNewMessage("");
      Alert.alert(
        "Message Sent!",
        `Your message has been sent to ${selectedConversation.user.name}`,
      );
    }
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
        {conversations.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row px-5 py-4 w-full gap-3 items-center border-b border-b-gray-100"
            onPress={() => {
              openChatModel(item);
            }}
            onLongPress={() => {
              deleteConversation(item.id);
            }}
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
      <Modal
        visible={isChatOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeChatModel}
        style={{
          marginTop: 70 + insets.top,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          padding: 10,
        }}
      >
        {selectedConversation && (
          <SafeAreaView style={{ flex: 1 }}>
            <View className="flex-row items-center gap-3 border-b border-b-gray-100 pb-4">
              <TouchableOpacity
                onPress={() => {
                  closeChatModel();
                }}
              >
                <Ionicons name="arrow-back" color="#1DA1F2" size={26} />
              </TouchableOpacity>
              <Image
                source={selectedConversation?.user.avatar}
                style={{
                  height: 37,
                  width: 37,
                  borderRadius: 18.5,
                  overflow: "hidden",
                }}
                contentFit="cover"
              />
              <View>
                <View className="flex-row gap-1 justify-center items-center">
                  <Text className="text-lg font-bold leading-tight">
                    {selectedConversation?.user.name}
                  </Text>
                  {selectedConversation.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )}
                </View>
                <Text className="text-base text-gray-500 leading-tight justify-center items-center">
                  @{selectedConversation?.user.username}
                </Text>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-1 px-4 py-4"
            >
              <Text className="text-center mt-2 text-gray-500 text-sm mb-4">
                This is the beginning of your conversation with{" "}
                {selectedConversation.user.name}
              </Text>
              {selectedConversation.messages.map((message) => (
                <View
                  className={`flex-row mb-3 ${message.fromUser ? "justify-end" : "justify-start"} gap-2 items-start`}
                  key={message.id}
                >
                  {!message.fromUser && (
                    <Image
                      source={selectedConversation?.user.avatar}
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        overflow: "hidden",
                      }}
                      contentFit="cover"
                    />
                  )}
                  <View
                    className={`flex-1 ${message.fromUser ? "items-end" : ""}`}
                  >
                    <View
                      className={`rounded-2xl px-4 py-3 max-w-xs ${
                        message.fromUser ? "bg-blue-500" : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={
                          message.fromUser ? "text-white" : "text-gray-900"
                        }
                      >
                        {message.text}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-500 mt-1 mr-1">
                      {message.time}
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
                  sendMessage();
                }}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </View>
  );
};

export default messages;
