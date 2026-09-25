import { useQuery } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";

export const useCurrentUser = () => {
  const api = useApiClient();
  const {
    data: currentUser,
    isLoading: isUserLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => userApi.getCurrentUser(api),
    select: (response) => response.data.user,
  });
  return { currentUser, isUserLoading, error, refetch };
};
