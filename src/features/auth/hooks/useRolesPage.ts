import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PaginationParams } from "../../../interfaces";
import { roleService } from "../../../services/role-service";

export function useRolesPage() {
  const [searchParams] = useSearchParams();
  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };
  const { data, isLoading } = useQuery({
    queryKey: ["roles", pagination],
    queryFn: () => roleService.getRoles(pagination),
  });

  return {
    rolesPage: data?.payload,
    isLoading,
  };
}
