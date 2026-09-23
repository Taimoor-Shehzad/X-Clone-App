import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Post, User } from "../types/types";
import { formatDate, formatNumber } from "../utils/formatter";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  isLiked?: boolean;
  currentUser: User;
}

const PostCard = ({
  currentUser,
  onDelete,
  onLike,
  post,
  isLiked,
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
              <Text className="text-lg font-extrabold leading-tight">
                {post.user.firstName} {post.user.lastName}
              </Text>
              <Text className="text-sm text-gray-500">
                @{post.user.username}
              </Text>
              <Text className="text-sm text-gray-500"> . </Text>
              <Text className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </Text>
            </View>
            {isOwnPost && (
              <TouchableOpacity onPress={() => handleDelete()}>
                <Ionicons name="trash" size={20} color="gray" />
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
                //  setCommentsOpened(true);
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
