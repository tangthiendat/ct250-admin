import { AxiosInstance } from "axios";
import { ApiResponse, IAirplane, Page, PaginationParams } from "../interfaces";
import { createApiClient } from "./api-client";
interface IAirplaneService {
    getAirplanes(
        pagination: PaginationParams,
        query: string,
    ): Promise<ApiResponse<Page<IAirplane>>>;
    create(
        newAirplane: Omit<IAirplane, "airplaneId">,
    ): Promise<ApiResponse<IAirplane>>;
    update(
        AirplaneId: number,
        updatedAirplane: IAirplane,
    ): Promise<ApiResponse<IAirplane>>;
    delete(AirplaneId: number): Promise<ApiResponse<void>>;
    getAllAirplanes(): Promise<ApiResponse<IAirplane[]>>;
}

const apiClient: AxiosInstance = createApiClient("airplanes");

class AirplaneService implements IAirplaneService {
    async getAirplanes(
        pagination: PaginationParams,
        query: string,
    ): Promise<ApiResponse<Page<IAirplane>>> {
        return (
            await apiClient.get("", {
                params: {
                    ...pagination,
                    query,
                },
            })
        ).data;
    }
    async create(
        newAirplane: Omit<IAirplane, "airplaneId">,
    ): Promise<ApiResponse<IAirplane>> {
        return (await apiClient.post("", newAirplane)).data;
    }

    async update(
        AirplaneId: number,
        updatedAirplane: IAirplane,
    ): Promise<ApiResponse<IAirplane>> {
        return (await apiClient.put(`/${AirplaneId}`, updatedAirplane)).data;
    }
    async delete(AirplaneId: number): Promise<ApiResponse<void>> {
        return (await apiClient.delete(`/${AirplaneId}`)).data;
    }
    async getAllAirplanes(): Promise<ApiResponse<IAirplane[]>> {
        return (await apiClient.get("/all")).data;
    }
}

export const airplaneService = new AirplaneService();
