import {
  ApiResponse,
  IPermission,
  Page,
  PaginationParams,
  PermissionFilterCriteria,
} from "../interfaces";
import { createApiClient } from "./api-client";

interface IPermissionsService {
  getPermissions(
    pagination: PaginationParams,
    filter?: PermissionFilterCriteria,
    sort?: string,
  ): Promise<ApiResponse<Page<IPermission>>>;
}

const apiClient = createApiClient("permissions");
class PermissionsService implements IPermissionsService {
  async getPermissions(
    pagination: PaginationParams,
    filter?: PermissionFilterCriteria,
    sort?: string,
  ): Promise<ApiResponse<Page<IPermission>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          method: filter?.method,
          module: filter?.module,
          sort: sort !== "" ? sort : undefined,
        },
      })
    ).data;
  }
}

export const permissionsService = new PermissionsService();
