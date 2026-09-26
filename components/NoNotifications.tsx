import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const NoNotifications = () => {
  return (
    <View className="flex-1 items-center justify-center mt-40 px-8">
      <Ionicons name="notifications-outline" size={90} color={"#E1E8ED"} />
      <Text className="text-xl font-bold text-gray-700 mt-4">
        No notifications yet
      </Text>
      <Text className="text-center text-gray-500 mt-1 text-base leading-tight">
        When people like, comment, or follow you, you'll see it here.
      </Text>
    </View>
  );
};

export default NoNotifications;
