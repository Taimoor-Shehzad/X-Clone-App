import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text className="color-fuchsia-800">Signed in</Text>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
      >
        <Text>Signout</Text>
      </TouchableOpacity>
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
