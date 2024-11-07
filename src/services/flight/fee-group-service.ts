import { AxiosInstance } from "axios";
import { ApiResponse, IFeeGroup } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IFeeGroupService {
  getAll(): Promise<ApiResponse<IFeeGroup[]>>;
  create(
    newFeeGroup: Omit<IFeeGroup, "feeGroupId">,
  ): Promise<ApiResponse<IFeeGroup>>;
}

const apiClient: AxiosInstance = createApiClient("fee-groups", { auth: true });

class FeeGroupService implements IFeeGroupService {
  async getAll(): Promise<ApiResponse<IFeeGroup[]>> {
    return (await apiClient.get("/all")).data;
  }
  async create(
    newFeeGroup: Omit<IFeeGroup, "feeGroupId">,
  ): Promise<ApiResponse<IFeeGroup>> {
    return (await apiClient.post("", newFeeGroup)).data;
  }
}

export const feeGroupService = new FeeGroupService();
