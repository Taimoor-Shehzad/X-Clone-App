import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
  Modal,
} from "react-native";
import { usePosts } from "../hooks/usePosts";
import PostCard from "./PostCard";
import { Post } from "../types/types";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useState } from "react";
import CommentsModal from "./CommentsModal";

const PostList = () => {
  const {
    posts,
    error,
    refetch,
    toggleLike,
    deletePost,
    isLoading,
    checkIsLiked,
  } = usePosts();
  const { currentUser } = useCurrentUser();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  let selectedPost = selectedPostId
    ? posts.find((p: Post) => p._id === selectedPostId)
    : null;

  if (isLoading) {
    return (
      <View className="w-full items-center justify-center mt-18">
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text className="text-gray-500 mt-6">Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-8 items-center">
        <Text className="text-gray-500 mb-4">Failed to load posts</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => refetch()}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View className="p-8 items-center">
        <Text className="text-gray-500">No posts yet</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post: Post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={toggleLike}
            onDelete={deletePost}
            isLiked={checkIsLiked(post.likes, currentUser)}
            currentUser={currentUser}
            onComment={(post: Post) => setSelectedPostId(post._id)}
          />
        ))}
      </ScrollView>
      <CommentsModal
        selectedPost={selectedPost}
        onClose={() => setSelectedPostId(null)}
      />
    </>
  );
};

export default PostList;
