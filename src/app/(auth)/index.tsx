import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { useSocialAuth } from "../../../hooks/useSocialAuth";

const Index = () => {
  const { isLoading, handleSocialAuth } = useSocialAuth();

  return (
    <View className="flex-1 bg-white px-10 justify-center items-center">
      <Image
        className="size-96"
        resizeMode="contain"
        source={require("@/assets/images/auth.png")}
      />
      <View className="w-full gap-3">
        <Pressable
          disabled={isLoading}
          className="elevation-xs rounded-full bg-white shadow-radius border border-gray-300"
          onPress={() => {
            handleSocialAuth("oauth_google");
          }}
        >
          {isLoading ? (
            <View className="flex-row justify-center items-center  py-4 px-5 w-full gap-3">
              <ActivityIndicator size={"small"} />
            </View>
          ) : (
            <View className="flex-row justify-center items-center rounded-full py-4 px-5 w-full gap-3">
              <Image
                className="size-6"
                resizeMode="cover"
                source={require("@/assets/images/google.png")}
              />
              <Text className="text-sm">Continue With Google</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          disabled={isLoading}
          className="elevation-xs rounded-full bg-white shadow-radius border border-gray-300"
          onPress={() => {
            handleSocialAuth("oauth_apple");
          }}
        >
          {isLoading ? (
            <View className="flex-row justify-center items-center py-4 px-5 w-full gap-3">
              <ActivityIndicator size={"small"} />
            </View>
          ) : (
            <View className="flex-row justify-center items-center py-4 px-5 w-full gap-3">
              <Image
                className="size-6"
                resizeMode="contain"
                source={require("@/assets/images/apple.png")}
              />
              <Text className="text-sm">Continue With Apple</Text>
            </View>
          )}
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
