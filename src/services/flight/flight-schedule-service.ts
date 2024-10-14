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
}

export const flightScheduleService = new FlightScheduleService();
