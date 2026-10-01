import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Post, User } from "../types/types";
import { formatDate, formatNumber } from "../utils/formatter";
import { router } from "expo-router";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  isLiked?: boolean;
  isFollowed?: boolean;
  currentUser: User;
  onComment: (post: Post) => void;
  followUser: (targetUserId: string) => void;
  isFollowing: boolean;
}

const PostCard = ({
  currentUser,
  onDelete,
  onLike,
  post,
  isLiked,
  onComment,
  followUser,
  isFollowing,
  isFollowed,
}: PostCardProps) => {
  const isOwnPost = post.user._id === currentUser._id;

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this post?", [
      { text: "cancel", style: "cancel" },
      {
        text: "Delete Post",
        style: "destructive",
        onPress: () => onDelete(post._id),
      },
    ]);
  };
  const fullName = `${post.user.firstName} ${post.user.lastName}`;
  const displayName =
    fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName;

  return (
    <View className="px-1 border-b py-3 border-b-gray-100">
      <View className="flex-row gap-3">
        <Image
          source={{
            uri: post.user.profilePicture || "",
          }}
          className="size-12 rounded-full"
          resizeMode="cover"
        />
        <View className="flex-1 justify-center">
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-1 items-center">
              <TouchableOpacity
                onPress={() => {
                  if (isOwnPost) {
                    router.push("/(tabs)/profile");
                    return;
                  }

                  router.push({
                    pathname: "/(screens)/userProfile",
                    params: { username: post.user.username },
                  });
                }}
              >
                <Text className="text-lg font-extrabold leading-tight">
                  {post.user.firstName.slice(0, 8)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (isOwnPost) {
                    router.push("/(tabs)/profile");
                    return;
                  }

                  router.push({
                    pathname: "/(screens)/userProfile",
                    params: { username: post.user.username },
                  });
                }}
              >
                <Text className="text-sm text-gray-500">
                  @{post.user.username.slice(0, 15)}
                </Text>
              </TouchableOpacity>
              <Text className="text-sm text-gray-500"> . </Text>
              <Text className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </Text>
            </View>
            {isOwnPost ? (
              <TouchableOpacity onPress={() => handleDelete()}>
                <Ionicons name="trash" size={20} color="gray" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="px-4 py-1 rounded-full bg-blue-500 items-center justify-center"
                onPress={() => {
                  followUser(post.user._id);
                }}
              >
                {isFollowed ? (
                  <Text className="text-white text-sm">Followed</Text>
                ) : isFollowing ? (
                  <ActivityIndicator size={"small"} color={"white"} />
                ) : (
                  <Text className="text-white text-sm">Follow</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
          {post.content && <Text className="mr-1">{post.content}</Text>}
          {post.image && (
            <View className="w-full rounded-2xl aspect-16/10 overflow-hidden mt-4">
              <Image
                source={{
                  uri: post.image,
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          )}

          <View className="flex-row mt-2.5 justify-between mr-5">
            <TouchableOpacity
              className="flex-row justify-center items-center"
              onPress={() => onLike(post._id)}
            >
              {isLiked ? (
                <Ionicons name="heart" size={16} color="#E0245E" />
              ) : (
                <Ionicons name="heart-outline" color="gray" size={16} />
              )}
              <Text className="text-sm ml-1" style={{ color: "gray" }}>
                {formatNumber(post.likes.length || 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center items-center"
              onPress={() => {
                onComment(post);
              }}
            >
              <Ionicons name="chatbox-outline" color="gray" size={16} />
              <Text className="text-sm ml-1" style={{ color: "gray" }}>
                {formatNumber(post.comments.length || 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-center items-center">
              <Ionicons name="repeat-outline" color="gray" size={16} />
              <Text className="text-sm ml-1" style={{ color: "gray" }}>
                0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-center items-center">
              <Ionicons name="share-outline" color="gray" size={16} />
              <Text className="text-sm ml-1" style={{ color: "gray" }}>
                0
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
