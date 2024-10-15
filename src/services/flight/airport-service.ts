import { AxiosInstance } from "axios";
import {
  ApiResponse,
  PaginationParams,
  Page,
  IAirport,
  ElasticSortParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";
interface IAirportService {
  getAirports(
    pagination: PaginationParams,
    query: string,
    sort?: ElasticSortParams,
  ): Promise<ApiResponse<Page<IAirport>>>;
  getAll(): Promise<ApiResponse<IAirport[]>>;
  create(
    newAirport: Omit<IAirport, "airportId">,
  ): Promise<ApiResponse<IAirport>>;
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
    sort?: ElasticSortParams,
  ): Promise<ApiResponse<Page<IAirport>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          query,
          sort: sort?.sort !== "" ? sort?.sort : undefined,
          order: sort?.order !== "" ? sort?.order : undefined,
        },
      })
    ).data;
  }

  async getAll(): Promise<ApiResponse<IAirport[]>> {
    return (await apiClient.get("/all")).data;
  }

  async create(
    newAirport: Omit<IAirport, "airportId">,
  ): Promise<ApiResponse<IAirport>> {
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
