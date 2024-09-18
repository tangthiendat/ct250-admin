import { AxiosInstance } from "axios";
import { ApiResponse, IUser, Page, PaginationParams } from "../interfaces";
import { createApiClient } from "./api-client";

interface IUserService {
  getLoggedInUser(): Promise<ApiResponse<IUser>>;
  getUsers(pagination: PaginationParams): Promise<ApiResponse<Page<IUser>>>;
  create(newUser: Omit<IUser, "userId">): Promise<ApiResponse<IUser>>;
  update(userId: string, updatedUser: IUser): Promise<ApiResponse<IUser>>;
}

const apiClient: AxiosInstance = createApiClient("users");
class UserService implements IUserService {
  async getLoggedInUser(): Promise<ApiResponse<IUser>> {
    return (await apiClient.get("/logged-in")).data;
  }

  async getUsers(
    pagination: PaginationParams,
  ): Promise<ApiResponse<Page<IUser>>> {
    return (await apiClient.get("", { params: pagination })).data;
  }

  async create(newUser: Omit<IUser, "userId">): Promise<ApiResponse<IUser>> {
    return (await apiClient.post("", newUser)).data;
  }

  async update(
    userId: string,
    updatedUser: IUser,
  ): Promise<ApiResponse<IUser>> {
    return (await apiClient.put(`/${userId}`, updatedUser)).data;
  }
}

export const userService = new UserService();
