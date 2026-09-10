import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function SsoCallback() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isLoaded) {
    if (isSignedIn) {
      // Redirect to home screen once session is active
      return <Redirect href="/(root)/home" />; // Adjust path if your route is "/home"
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" />
    </View>
  );
}
