import { AxiosInstance } from "axios";
import {
  ApiResponse,
  IAirport,
  Page,
  PaginationParams,
  SortParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";
interface IAirportService {
  getAirports(
    pagination: PaginationParams,
    query: string,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IAirport>>>;
  getAll(): Promise<ApiResponse<IAirport[]>>;
  create(newAirport: FormData): Promise<ApiResponse<IAirport>>;
  update(
    airportId: number,
    updatedAirport: IAirport,
  ): Promise<ApiResponse<IAirport>>;
  delete(airportId: number): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("airports");

class AirportService implements IAirportService {
  async getAirports(
    pagination: PaginationParams,
    query: string,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IAirport>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          query,
          sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
          order: sort?.direction !== "" ? sort?.direction : undefined,
        },
      })
    ).data;
  }

  async getAll(): Promise<ApiResponse<IAirport[]>> {
    return (await apiClient.get("/all")).data;
  }

  async create(newAirport: FormData): Promise<ApiResponse<IAirport>> {
    return (await apiClient.post("", newAirport)).data;
  }

  async update(
    airportId: number,
    updatedAirport: IAirport,
  ): Promise<ApiResponse<IAirport>> {
    return (await apiClient.put(`/${airportId}`, updatedAirport)).data;
  }
  async delete(airportId: number): Promise<ApiResponse<void>> {
    return (await apiClient.delete(`/${airportId}`)).data;
  }
}

export const airportService = new AirportService();
