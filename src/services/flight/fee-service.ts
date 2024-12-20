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
  create(newFee: IFee): Promise<ApiResponse<IFee>>;
  update(feeId: number, updatedFee: IFee): Promise<ApiResponse<IFee>>;
  getById(feeId: number): Promise<ApiResponse<IFee>>;
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

  async getById(feeId: number): Promise<ApiResponse<IFee>> {
    return (await apiClient.get(`/${feeId}`)).data;
  }

  async create(newFee: IFee): Promise<ApiResponse<IFee>> {
    return (await apiClient.post("", newFee)).data;
  }

  async update(feeId: number, updatedFee: IFee): Promise<ApiResponse<IFee>> {
    return (await apiClient.put(`/${feeId}`, updatedFee)).data;
  }
}

export const feeService = new FeeService();
