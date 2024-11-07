import { AxiosInstance } from "axios";
import { ApiResponse, IFeeGroup } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IFeeGroupService {
  getAll(): Promise<ApiResponse<IFeeGroup[]>>;
}

const apiClient: AxiosInstance = createApiClient("fee-groups", { auth: true });

class FeeGroupService implements IFeeGroupService {
  async getAll(): Promise<ApiResponse<IFeeGroup[]>> {
    return (await apiClient.get("/all")).data;
  }
}

export const feeGroupService = new FeeGroupService();
