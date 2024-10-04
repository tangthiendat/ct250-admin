import { AxiosInstance } from "axios";
import {
  ApiResponse,
  IRoute,
  Page,
  PaginationParams,
  SortParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IRouteService {
  getRoutes(
    pagination: PaginationParams,
    sort?: SortParams,
    query?: string,
  ): Promise<ApiResponse<Page<IRoute>>>;

  create(route: Omit<IRoute, "routeId">): Promise<ApiResponse<IRoute>>;
  update(routeId: number, updatedRoute: IRoute): Promise<ApiResponse<IRoute>>;
  delete(routeId: number): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("routes");
class RouteService implements IRouteService {
  async getRoutes(
    pagination: PaginationParams,
    sort?: SortParams,
    query?: string,
  ): Promise<ApiResponse<Page<IRoute>>> {
    return (
      await apiClient.get("", {
        params: {
          ...pagination,
          sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
          direction: sort?.direction !== "" ? sort?.direction : undefined,
          query,
        },
      })
    ).data;
  }
  async create(route: Omit<IRoute, "routeId">): Promise<ApiResponse<IRoute>> {
    return (await apiClient.post("", route)).data;
  }

  async update(
    routeId: number,
    updatedRoute: IRoute,
  ): Promise<ApiResponse<IRoute>> {
    return (await apiClient.put(`/${routeId}`, updatedRoute)).data;
  }

  async delete(routeId: number): Promise<ApiResponse<void>> {
    return (await apiClient.delete(`/${routeId}`)).data;
  }
}

export const routeService = new RouteService();
