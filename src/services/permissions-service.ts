import {
  ApiResponse,
  IPermission,
  Page,
  PaginationParams,
  PermissionFilterCriteria,
  SortParams,
} from "../interfaces";
import { createApiClient } from "./api-client";

interface IPermissionsService {
  getPermissions(
    pagination: PaginationParams,
    filter?: PermissionFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IPermission>>>;

  getAllPermissions(): Promise<ApiResponse<IPermission[]>>;
  create(
    permission: Omit<IPermission, "permissionId">,
  ): Promise<ApiResponse<IPermission>>;
  update(permission: IPermission): Promise<ApiResponse<IPermission>>;
}

const apiClient = createApiClient("permissions");
class PermissionsService implements IPermissionsService {
  async getPermissions(
    pagination: PaginationParams,
    filter?: PermissionFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IPermission>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          method: filter?.method,
          module: filter?.module,
          sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
          direction: sort?.direction !== "" ? sort?.direction : undefined,
        },
      })
    ).data;
  }

  async getAllPermissions(): Promise<ApiResponse<IPermission[]>> {
    return (await apiClient.get("/all")).data;
  }

  async create(
    permission: Omit<IPermission, "permissionId">,
  ): Promise<ApiResponse<IPermission>> {
    return (await apiClient.post("", permission)).data;
  }

  async update(permission: IPermission): Promise<ApiResponse<IPermission>> {
    return (await apiClient.put(`/${permission.permissionId}`, permission))
      .data;
  }
}

export const permissionsService = new PermissionsService();
