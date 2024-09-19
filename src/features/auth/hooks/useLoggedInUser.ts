import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/user-service";

export function useLoggedInUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["logged-in-user"],
    queryFn: userService.getLoggedInUser,
  });
  return { user: data?.payload, isLoading };
}
