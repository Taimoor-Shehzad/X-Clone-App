import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/expo";
import { ActivityIndicator, View } from "react-native";
export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isSignedIn) {
    return <Redirect href="../(tabs)/home" />;
  }
  if (!isLoaded) {
    return (
      <View className="bg-white flex-1 justify-center items-center p-10">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
      </View>
    );
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
