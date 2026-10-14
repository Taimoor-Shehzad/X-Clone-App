import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApi, useApiClient } from "../utils/api";
import { useState } from "react";
import { Alert } from "react-native";

export const useComments = () => {
  const [commentText, setCommentText] = useState("");
  const api = useApiClient();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const response = await commentApi.createComment(api, postId, content);
      return response.data;
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      Alert.alert("Error", "Failed to post comment, please try again.");
    },
  });

  const createComment = (postId: string) => {
    if (!commentText.trim()) {
      Alert.alert("Empty Comment", "Please write something before commenting.");
      return;
    }
    createCommentMutation.mutate({ postId, content: commentText.trim() });
  };

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => commentApi.deleteComment(api, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      Alert.alert("Error", "An error occured while deleting the comment.");
    },
  });

  const deleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
  };

  return {
    commentText,
    setCommentText,
    createComment,
    deleteComment,
    isCreatingComment: createCommentMutation.isPending,
  };
};
