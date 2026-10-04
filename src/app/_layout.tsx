import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import SafeScreen from "../../components/SafeScreen";
import "../../global.css";
import { StatusBar } from "react-native";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <QueryClientProvider client={queryClient}>
          <SafeScreen>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            </Stack>
          </SafeScreen>
          <StatusBar barStyle={"dark-content"} />
        </QueryClientProvider>
      </ClerkProvider>
    </ConvexProvider>
  );
}
