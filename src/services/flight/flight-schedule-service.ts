import {
  ApiResponse,
  IFlightSchedule,
  Page,
  PaginationParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IFlightScheduleService {
  getFlights(
    pagination: PaginationParams,
  ): Promise<ApiResponse<Page<IFlightSchedule>>>;
  getFlight(flightId: string): Promise<ApiResponse<IFlightSchedule>>;
  upload(formData: FormData): Promise<ApiResponse<void>>;
}

const apiClient = createApiClient("flights", { auth: true });

class FlightScheduleService implements IFlightScheduleService {
  async getFlights(
    pagination: PaginationParams,
  ): Promise<ApiResponse<Page<IFlightSchedule>>> {
    return (await apiClient.get("", { params: pagination })).data;
  }

  async getFlight(flightId: string): Promise<ApiResponse<IFlightSchedule>> {
    return (await apiClient.get(`/${flightId}`)).data;
  }

  async upload(formData: FormData): Promise<ApiResponse<void>> {
    return (await apiClient.post("/upload", formData)).data;
  }
}

export const flightScheduleService = new FlightScheduleService();
