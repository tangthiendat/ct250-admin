import { AxiosInstance } from "axios";
import { ApiResponse, IUser, Page, PaginationParams } from "../interfaces";
import { createApiClient } from "./api-client";

interface IUserService {
  getLoggedInUser(): Promise<ApiResponse<IUser>>;
  getUsers(pagination: PaginationParams): Promise<ApiResponse<Page<IUser>>>;
  create(newUser: Omit<IUser, "userId">): Promise<ApiResponse<IUser>>;
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
}

export const userService = new UserService();
