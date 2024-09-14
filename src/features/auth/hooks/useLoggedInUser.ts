import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/users-service";

export function useLoggedInUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user", "logged-in"],
    queryFn: userService.getLoggedInUser,
  });
  return { user: data?.payload, isLoading };
}
