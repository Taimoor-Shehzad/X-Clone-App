import { useQuery } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";

export const useTargetUser = (username: string) => {
  const api = useApiClient();

  const {
    data: targetUser,
    isLoading: isTargetUserLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["targetUser", username],
    queryFn: () => userApi.getTargetUserProfile(api, username),
    select: (response) => response.data.user,
  });

  return { targetUser, isTargetUserLoading, error, refetch };
};
