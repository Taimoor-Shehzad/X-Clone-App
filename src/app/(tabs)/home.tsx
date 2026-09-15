import { useAuth } from "@clerk/expo";
import { StyleSheet, Text, View } from "react-native";
import LogoutButton from "../../../components/LogoutButton";
import { useUserSync } from "../../../hooks/useUserSync";

export default function Index() {
  const { signOut } = useAuth();
  useUserSync();
  return (
    <View style={styles.container}>
      <Text className="color-fuchsia-800">Signed i</Text>
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
