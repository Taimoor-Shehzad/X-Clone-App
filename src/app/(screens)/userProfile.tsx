import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { useTargetUser } from "../../../hooks/useTargetUser";
import PostList from "../../../components/PostList";
import { Feather, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePosts } from "../../../hooks/usePosts";
import { router, useLocalSearchParams } from "expo-router";

const UserProfile = () => {
  const { username } = useLocalSearchParams<{ username?: string }>();
  const safeUsername = Array.isArray(username) ? username[0] : (username ?? "");

  const { targetUser, isTargetUserLoading, error, refetch } =
    useTargetUser(safeUsername);
  const insets = useSafeAreaInsets();
  const {
    posts: userPosts,
    isLoading: isUserPostsLoading,
    refetch: refetchUserPosts,
  } = usePosts(targetUser?.username);

  if (!safeUsername) {
    return (
      <View className="bg-white items-center justify-center flex-1 p-8">
        <Text className="text-lg text-gray-500">No username provided.</Text>
      </View>
    );
  }

  if (isTargetUserLoading) {
    return (
      <View className="bg-white items-center justify-center flex-1 p-8">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
        <Text className="text-lg text-gray-500">Loading User Profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="bg-white items-center justify-center flex-1 p-8">
        <Text className="text-lg text-gray-500">
          Failed to get user proflie.
        </Text>
        <TouchableOpacity
          className="rounded-sm bg-blue-500 px-3 py-2"
          onPress={() => {
            refetch();
          }}
        >
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingBottom: insets.bottom }}>
      {/* //Header */}
      <View className="flex-row w-full justify-between px-4 items-center mb-4">
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" color={"#1DA1F2"} size={35} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        refreshControl={
          <RefreshControl
            refreshing={isUserPostsLoading}
            onRefresh={() => {
              refetchUserPosts();
            }}
            tintColor={"#1DAF12"}
          />
        }
      >
        {/* Banner Image */}
        <Image
          source={{
            uri:
              targetUser.bannerImage ||
              "https://static.vecteezy.com/system/resources/previews/060/844/016/non_2x/snow-capped-mountains-reflected-in-a-still-lake-hd-background-luxury-hd-wallpaper-image-popular-high-resolution-desktop-background-free-photo.jpg",
          }}
          resizeMode="cover"
          className="aspect-21/9"
        />
        {/* User Profile Image */}
        <View className="w-full justify-between flex-row items-end px-4">
          <Image
            source={{ uri: targetUser.profilePicture }}
            resizeMode="cover"
            className="size-28 rounded-full border-4 border-white -mt-15"
          />
        </View>
        {/* User Details */}
        <View className="px-4 mt-3 w-full gap-1 items-start">
          {/* Name */}
          <Text className="flex-row items-center gap-1">
            <Text className="text-xl font-bold">
              {targetUser.firstName} {targetUser.lastName}{" "}
            </Text>
            <Feather name="check-circle" size={20} color="#1DA1F2" />
          </Text>
          {/* Username */}
          <Text className="text-sm text-gray-500">@{targetUser.username}</Text>
          {/* Bio */}
          <Text>{targetUser.bio || "No bio set"}</Text>
          {/* Location */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" color={"#657786"} size={16} />
            <Text className="text-gray-500">
              {targetUser.location || "No location set"}
            </Text>
          </View>
          {/* Date Joined */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="calendar-outline" color={"#657786"} size={16} />
            <Text className="text-gray-500">
              Joined {format(new Date(targetUser.createdAt), "MMMM yyyy")}
            </Text>
          </View>
          {/* Following/Follwers */}
          <View className="flex-row gap-5">
            <View className="flex-row items-center gap-1">
              <Text className="font-bold">
                {targetUser.following.length || "0"}
              </Text>
              <Text className="text-gray-500">Following</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="font-bold">
                {targetUser.followers.length || "0"}
              </Text>
              <Text className="text-gray-500">Followers</Text>
            </View>
          </View>
        </View>
        <View className="px-2 mt-4">
          <PostList username={targetUser?.username} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
