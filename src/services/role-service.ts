import { ApiResponse, IRole, Page, PaginationParams } from "../interfaces";
import { createApiClient } from "./api-client";

interface IRoleService {
  getRoles(pagination: PaginationParams): Promise<ApiResponse<Page<IRole>>>;
  create(newRole: Omit<IRole, "roleId">): Promise<ApiResponse<IRole>>;
}

const apiClient = createApiClient("roles");

class RoleService implements IRoleService {
  async getRoles(
    pagination: PaginationParams,
  ): Promise<ApiResponse<Page<IRole>>> {
    return (await apiClient.get("", { params: pagination })).data;
  }
  async create(newRole: Omit<IRole, "roleId">): Promise<ApiResponse<IRole>> {
    return (await apiClient.post("", newRole)).data;
  }
}

export const roleService = new RoleService();
