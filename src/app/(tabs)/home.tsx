import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LogoutButton from "../../../components/LogoutButton";
import { useUserSync } from "../../../hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "../../../components/PostComposer";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import HomeHeader from "../../../components/HomeHeader";
import PostList from "../../../components/PostList";

export default function Index() {
  const [commentsOpened, setCommentsOpened] = useState(false);
  const insets = useSafeAreaInsets();
  const { currentUser } = useCurrentUser();
  useUserSync();
  return (
    <View className="bg-white flex-1 justify-start items-center px-3 py-3">
      <HomeHeader />
      <PostComposer />
      <PostList />
      {/* Comment MOdel */}
    </View>
  );
}
