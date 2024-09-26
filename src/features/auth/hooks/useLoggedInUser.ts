import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/user-service";

export function useLoggedInUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["users, logged-in"],
    queryFn: userService.getLoggedInUser,
  });
  return { user: data?.payload, isLoading };
}
