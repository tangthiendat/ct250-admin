import { ApiResponse, IRole, Page, PaginationParams } from "../interfaces";
import { createApiClient } from "./api-client";

interface IRoleService {
  getRoles(pagination: PaginationParams): Promise<ApiResponse<Page<IRole>>>;
}

const apiClient = createApiClient("roles");

class RoleService implements IRoleService {
  async getRoles(
    pagination: PaginationParams,
  ): Promise<ApiResponse<Page<IRole>>> {
    return (await apiClient.get("", { params: pagination })).data;
  }
}

export const roleService = new RoleService();
