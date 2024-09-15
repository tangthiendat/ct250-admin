import {
  ApiResponse,
  IPermission,
  Page,
  PaginationParams,
} from "../interfaces";
import { createApiClient } from "./api-client";

interface IPermissionsService {
  getPermissions(
    pagination: PaginationParams,
    filter?: string,
    sort?: string,
  ): Promise<ApiResponse<Page<IPermission>>>;
}

const apiClient = createApiClient("permissions");
class PermissionsService implements IPermissionsService {
  async getPermissions(
    pagination: PaginationParams,
    filter?: string,
    sort?: string,
  ): Promise<ApiResponse<Page<IPermission>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          filter: filter !== "()" ? filter : undefined,
          sort: sort !== "" ? sort : undefined,
        },
      })
    ).data;
  }
}

export const permissionsService = new PermissionsService();
