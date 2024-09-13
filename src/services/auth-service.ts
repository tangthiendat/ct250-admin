import { AxiosInstance } from "axios";
import { ApiResponse, IAuthRequest, IAuthResponse } from "../interfaces";
import { createApiClient } from "./api-client";

interface IAuthService {
  login(authRequest: IAuthRequest): Promise<ApiResponse<IAuthResponse>>;
}

class AuthService implements IAuthService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = createApiClient("auth", { auth: false });
  }

  async login(authRequest: IAuthRequest): Promise<ApiResponse<IAuthResponse>> {
    return (await this.apiClient.post("/login", authRequest)).data;
  }
}

export const authService = new AuthService();
