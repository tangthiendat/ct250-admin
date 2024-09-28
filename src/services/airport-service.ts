import { AxiosInstance } from 'axios';
import { ApiResponse, PaginationParams, Page } from '../interfaces';
import { IAirport } from './../../.history/src/interfaces/flight/index_20240927132520';
import { createApiClient } from './api-client';
interface IAirportService {
    getAirports(pagination: PaginationParams): Promise<ApiResponse<Page<IAirport>>>;
}

const apiClient: AxiosInstance = createApiClient("airports");

class AirportService implements IAirportService {
    async getAirports(pagination: PaginationParams): Promise<ApiResponse<Page<IAirport>>> {
        return (await apiClient.get("", { params: pagination })).data;
    }
}

export const airportService = new AirportService();
