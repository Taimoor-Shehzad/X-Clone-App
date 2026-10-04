import { useQuery } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { useCurrentUser } from "./useCurrentUser";

export const useUsers = () => {
  const api = useApiClient();
  const { currentUser } = useCurrentUser();
  const {
    data: Users,
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: () => userApi.getUsers(api),
    select: (res) =>
      res.data.users.filter((user: any) => user._id !== currentUser?._id),
  });
  return {
    Users,
    refetch,
    error,
    isLoading,
  };
};
