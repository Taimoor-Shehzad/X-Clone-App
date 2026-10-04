import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "../types/types";
import { useQuery } from "convex/react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { api } from "../convex/_generated/api";

interface UserCardProps {
  user: User;
  openChatModel: (user: User) => void;
}

const UserCard = ({ user, openChatModel }: UserCardProps) => {
  const { currentUser, isUserLoading } = useCurrentUser();

  const messages = useQuery(
    api.messages.getMessages,
    currentUser ? { from: currentUser._id, to: user._id } : "skip",
  );

  const latestMessage = messages?.at(-1);

  let displayText = "Loading Messages...";
  if (!isUserLoading && messages) {
    displayText = latestMessage?.text || "No messages yet";
  }

  return (
    <TouchableOpacity
      className="flex-row px-5 py-4 w-full gap-3 items-center border-b border-b-gray-100"
      onPress={() => {
        openChatModel(user);
      }}
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
            <Text className="text-lg font-bold leading-tight">
              {user.firstName} {user.lastName}
            </Text>
          </Text>
        </View>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {displayText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
