import { View, Text, Pressable, Image } from "react-native";
// import { Image } from "expo-image";

const Index = () => {
  return (
    <View className="flex-1 bg-white px-10 justify-center items-center">
      <Image
        className="size-96"
        resizeMode="contain"
        source={require("@/assets/images/auth.png")}
      />
      <View className="w-full gap-3">
        <Pressable>
          <View className="flex-row justify-center items-center border border-gray-300 rounded-full py-4 px-5 w-full gap-3">
            <Image
              className="size-6"
              resizeMode="cover"
              source={require("@/assets/images/google.png")}
            />
            <Text className="text-sm">Continue With Google</Text>
          </View>
        </Pressable>
        <Pressable>
          <View className="flex-row justify-center items-center border border-gray-300 rounded-full py-4 px-5 w-full gap-3">
            <Image
              className="size-6"
              resizeMode="contain"
              source={require("@/assets/images/apple.png")}
            />
            <Text className="text-sm">Continue With Apple</Text>
          </View>
        </Pressable>
        <Text className="text-center text-gray-500 text-xs leading-4 mt-3 px-2">
          By signing up, you agree to our{" "}
          <Text className="text-blue-500">Terms</Text>
          {", "}
          <Text className="text-blue-500">Privacy Policy</Text>
          {", and "}
          <Text className="text-blue-500">Cookie Use</Text>.
        </Text>
      </View>
    </View>
  );
};

export default Index;
