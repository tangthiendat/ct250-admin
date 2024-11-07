import { AxiosInstance } from "axios";
import {
  ApiResponse,
  IFee,
  Page,
  PaginationParams,
  SortParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IFeeService {
  getFees(
    pagination: PaginationParams,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IFee>>>;
}

const apiClient: AxiosInstance = createApiClient("fees", { auth: true });

class FeeService implements IFeeService {
  async getFees(
    pagination: PaginationParams,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IFee>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
          direction: sort?.direction !== "" ? sort?.direction : undefined,
        },
      })
    ).data;
  }
}

export const feeService = new FeeService();
