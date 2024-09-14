import { AxiosInstance } from "axios";
import { ApiResponse, IAuthRequest, IAuthResponse } from "../interfaces";
import { createApiClient } from "./api-client";

interface IAuthService {
  login(authRequest: IAuthRequest): Promise<ApiResponse<IAuthResponse>>;
}

const apiClient: AxiosInstance = createApiClient("auth", { auth: false });
class AuthService implements IAuthService {
  async login(authRequest: IAuthRequest): Promise<ApiResponse<IAuthResponse>> {
    return (await apiClient.post("/login", authRequest)).data;
  }
}

export const authService = new AuthService();
