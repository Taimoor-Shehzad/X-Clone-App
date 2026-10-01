import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Modal,
  TextInput,
} from "react-native";
import LogoutButton from "../../../components/LogoutButton";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Feather, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostList from "../../../components/PostList";
import { usePosts } from "../../../hooks/usePosts";
import ProfileEditModal from "../../../components/ProfileEditModal";
import { useProfile } from "../../../hooks/useProfile";

const profile = () => {
  const { currentUser, isUserLoading } = useCurrentUser();
  const insets = useSafeAreaInsets();
  const {
    posts: userPosts,
    isLoading: isUserPostsLoading,
    refetch: refetchUserPosts,
  } = usePosts(currentUser?.username);
  const {
    saveInfo,
    updateField,
    openEditModal,
    isSavingInfo,
    refetch: refetchProfile,
    closeEditModal,
    formData,
    isEditingModalVisible,
  } = useProfile();

  if (isUserLoading) {
    return (
      <View className=" bg-white flex-1 justify-center">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
      </View>
    );
  }
  return (
    <View className="bg-white flex-1">
      {/* //Header */}
      <View className="flex-row w-full justify-between px-4 mt-6 items-center mb-4">
        <View className="items-start justify-center">
          <Text className="font-bold text-xl leading-tight">
            {currentUser.firstName}
          </Text>
          <Text className="text-sm text-gray-500">
            {userPosts.length} Posts
          </Text>
        </View>
        <LogoutButton />
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
              refetchProfile();
            }}
            tintColor={"#1DAF12"}
          />
        }
      >
        {/* Banner Image */}
        <Image
          source={{
            uri:
              currentUser.bannerImage ||
              "https://static.vecteezy.com/system/resources/previews/060/844/016/non_2x/snow-capped-mountains-reflected-in-a-still-lake-hd-background-luxury-hd-wallpaper-image-popular-high-resolution-desktop-background-free-photo.jpg",
          }}
          resizeMode="cover"
          className="aspect-21/9"
        />
        {/* User Profile Image */}
        <View className="w-full justify-between flex-row items-end px-4">
          <Image
            source={{ uri: currentUser.profilePicture }}
            resizeMode="cover"
            className="size-28 rounded-full border-4 border-white -mt-15"
          />
          <TouchableOpacity
            className="border py-1 justify-center items-center px-6 rounded-full border-gray-200"
            onPress={() => {
              openEditModal();
            }}
          >
            <Text className="font-bold">Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {/* User Details */}
        <View className="px-4 mt-3 w-full gap-1 items-start">
          {/* Name */}
          <View className="flex-row items-center gap-1">
            <Text className="text-xl font-bold">
              <Text>{currentUser.firstName}</Text>
            </Text>
            <Feather name="check-circle" size={20} color="#1DA1F2" />
          </View>
          <Text>{currentUser.lastName}</Text>
          {/* Username */}
          <Text className="text-sm text-gray-500">@{currentUser.username}</Text>
          {/* Bio */}
          <Text>{currentUser.bio || "No bio set"}</Text>
          {/* Location */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" color={"#657786"} size={16} />
            <Text className="text-gray-500">
              {currentUser.location || "No location set"}
            </Text>
          </View>
          {/* Date Joined */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="calendar-outline" color={"#657786"} size={16} />
            <Text className="text-gray-500">
              Joined {format(new Date(currentUser.createdAt), "MMMM yyyy")}
            </Text>
          </View>
          {/* Following/Follwers */}
          <View className="flex-row gap-5">
            <View className="flex-row items-center gap-1">
              <Text className="font-bold">
                {currentUser.following.length || "0"}
              </Text>
              <Text className="text-gray-500">Following</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="font-bold">
                {currentUser.followers.length || "0"}
              </Text>
              <Text className="text-gray-500">Followers</Text>
            </View>
          </View>
        </View>
        <View className="px-2 mt-4">
          <PostList username={currentUser?.username} />
        </View>
      </ScrollView>
      <ProfileEditModal
        isVisible={isEditingModalVisible}
        closeEditModal={closeEditModal}
        saveInfo={saveInfo}
        updateField={updateField}
        isSaving={isSavingInfo}
        formData={formData}
      />
    </View>
  );
};

export default profile;
