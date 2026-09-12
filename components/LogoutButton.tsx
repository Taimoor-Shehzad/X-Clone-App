import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSignout } from "../hooks/useSignout";

const LogoutButton = () => {
  const { handleSignOut } = useSignout();

  return (
    <TouchableOpacity onPress={() => handleSignOut()}>
      <Ionicons name="log-out-outline" size={24} color={"#E0245E"} />
    </TouchableOpacity>
  );
};

export default LogoutButton;
