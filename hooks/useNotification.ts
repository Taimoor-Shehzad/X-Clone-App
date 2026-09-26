import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsApi, useApiClient } from "../utils/api";
import { Alert } from "react-native";

export const useNotification = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    error,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.getNotifications(api),
    select: (res) => res.data.notifications,
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: string) =>
      notificationsApi.deleteNotifications(api, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      Alert.alert("Error", "Failed to delete notification,Please try again.");
    },
  });

  const deleteNotification = (notificationId: string) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  return {
    notifications: notificationsData,
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
    isDeletingNotification: () => deleteNotificationMutation.isPending,
  };
};
