import { AxiosInstance } from 'axios';
import { ApiResponse, PaginationParams, Page, IAirport } from '../interfaces';
import { createApiClient } from './api-client';
interface IAirportService {
    getAirports(pagination: PaginationParams): Promise<ApiResponse<Page<IAirport>>>;
    create(newAirport: Omit<IAirport, "airportId">): Promise<ApiResponse<IAirport>>;
    update(airportId: number, updatedAirport: IAirport): Promise<ApiResponse<IAirport>>;
    delete(airportId: number): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("airports");

class AirportService implements IAirportService {
    async getAirports(pagination: PaginationParams): Promise<ApiResponse<Page<IAirport>>> {
        return (await apiClient.get("", { params: pagination })).data;
    }
    async create(newAirport: Omit<IAirport, "airportId">): Promise<ApiResponse<IAirport>> {
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
