import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi, useApiClient, userApi } from "../utils/api";
import { Alert } from "react-native";

export const usePosts = (username?: string) => {
  const api = useApiClient();
  const queryClient = useQueryClient();
  const {
    data: postsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: username ? ["userPosts", username] : ["posts"],
    queryFn: () =>
      username ? postApi.getUserPosts(api, username) : postApi.getPosts(api),
    select: (response) => response.data.posts,
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.likePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const followUserMutation = useMutation({
    mutationFn: (targetUserid: string) => userApi.followUser(api, targetUserid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      Alert.alert("Error", "An error occured while following the user.");
    },
  });

  const checkIsFollowed = (postUserId: string, currentUser: any) => {
    const isFollowed =
      currentUser && currentUser.following.includes(postUserId);
    return isFollowed;
  };

  const checkIsLiked = (postLikes: string[], currentUser: any) => {
    const isLiked = currentUser && postLikes.includes(currentUser._id);
    return isLiked;
  };

  return {
    posts: postsData || [],
    isLoading,
    refetch,
    error,
    toggleLike: (postId: string) => likePostMutation.mutate(postId),
    deletePost: (postId: string) => deletePostMutation.mutate(postId),
    checkIsLiked,
    isFollowing: followUserMutation.isPending,
    followUser: (targetUserId: string) =>
      followUserMutation.mutate(targetUserId),
    checkIsFollowed,
  };
};
