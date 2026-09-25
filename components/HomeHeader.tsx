import { View, Text, Image } from "react-native";
import React from "react";
import LogoutButton from "./LogoutButton";

const HomeHeader = () => {
  return (
    <View className="flex-row justify-between w-full mt-10">
      <Image
        source={require("@/assets/images/twitter.png")}
        className="size-8"
        resizeMode="cover"
      />

      <Text className="font-bold text-2xl">Home</Text>
      <LogoutButton />
    </View>
  );
};

export default HomeHeader;
