import { AxiosInstance } from "axios";
import {
  ApiResponse,
  IPassenger,
  Page,
  PaginationParams,
  PassengerFilterCriteria,
  SortParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IPassengerService {
  getPassengers(
    pagination: PaginationParams,
    filter: PassengerFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IPassenger>>>;
  update(
    passengerId: number,
    updatedPassenger: IPassenger,
  ): Promise<ApiResponse<IPassenger>>;
  delete(passengerId: number): Promise<ApiResponse<void>>;
  getShareStats(): Promise<ApiResponse<Map<string, number>>>;
}

const apiClient: AxiosInstance = createApiClient("passengers");

class PassengerService implements IPassengerService {
  async getPassengers(
    pagination: PaginationParams,
    filter?: PassengerFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IPassenger>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          ...filter,
          sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
          direction: sort?.direction !== "" ? sort?.direction : undefined,
        },
      })
    ).data;
  }

  async update(
    passengerId: number,
    updatedPassenger: IPassenger,
  ): Promise<ApiResponse<IPassenger>> {
    return (await apiClient.put(`/${passengerId}`, updatedPassenger)).data;
  }
  async delete(passengerId: number): Promise<ApiResponse<void>> {
    return (await apiClient.delete(`/${passengerId}`)).data;
  }

  async getShareStats(): Promise<ApiResponse<Map<string, number>>> {
    return (await apiClient.get("/share-stats")).data;
  }
}

export const passengerService = new PassengerService();
