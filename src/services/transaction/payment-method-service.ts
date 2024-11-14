import { AxiosInstance } from "axios";
import {
  ApiResponse,
  IPaymentMethod,
  Page,
  PaginationParams,
  SortParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IPaymentMethodService {
  getPaymentMethods(
    pagination: PaginationParams,
    //query: string,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IPaymentMethod>>>;
  create(
    newPaymentMethod: IPaymentMethod,
  ): Promise<ApiResponse<IPaymentMethod>>;
  update(
    paymentMethodId: number,
    updatedPaymentMethod: IPaymentMethod,
  ): Promise<ApiResponse<IPaymentMethod>>;
  delete(paymentMethodId: number): Promise<ApiResponse<void>>;
  getAllPaymentMethods(): Promise<ApiResponse<IPaymentMethod[]>>;
}

const apiClient: AxiosInstance = createApiClient("payment-methods");

class PaymentMethodService implements IPaymentMethodService {
  async getPaymentMethods(
    pagination: PaginationParams,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IPaymentMethod>>> {
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

  async create(
    newPaymentMethod: Omit<IPaymentMethod, "paymentMethodId">,
  ): Promise<ApiResponse<IPaymentMethod>> {
    return (await apiClient.post("", newPaymentMethod)).data;
  }

  async update(
    paymentMethodId: number,
    updatedPaymentMethod: IPaymentMethod,
  ): Promise<ApiResponse<IPaymentMethod>> {
    return (await apiClient.put(`/${paymentMethodId}`, updatedPaymentMethod))
      .data;
  }
  async delete(paymentMethodId: number): Promise<ApiResponse<void>> {
    return (await apiClient.delete(`/${paymentMethodId}`)).data;
  }
  async getAllPaymentMethods(): Promise<ApiResponse<IPaymentMethod[]>> {
    return (await apiClient.get("/all")).data;
  }
}

export const paymentMethodService = new PaymentMethodService();
