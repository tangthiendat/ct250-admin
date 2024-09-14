import { AxiosInstance } from "axios";
import { ApiResponse, IUser } from "../interfaces";
import { createApiClient } from "./api-client";

interface IUserService {
  getLoggedInUser(): Promise<ApiResponse<IUser>>;
}

const apiClient: AxiosInstance = createApiClient("users");
class UserService implements IUserService {
  async getLoggedInUser(): Promise<ApiResponse<IUser>> {
    return (await apiClient.get("/logged-in")).data;
  }
}

export const userService = new UserService();
