import { AxiosInstance } from "axios";
import {
  ApiResponse,
  BookingFilterCriteria,
  IBooking,
  StatisticFilterCriteria,
  Page,
  PaginationParams,
  SortParams,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IBookingService {
  getBookings(
    pagination: PaginationParams,
    filter: BookingFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IBooking>>>;
  getBooking(bookingId: string): Promise<ApiResponse<IBooking>>;
  update(
    bookingId: number,
    updatedBooking: IBooking,
  ): Promise<ApiResponse<IBooking>>;
  getLast30DaysBookingSales(): Promise<ApiResponse<number>>;
  getLast30DaysCount(): Promise<ApiResponse<number>>;
  getSalesStats(
    filter: StatisticFilterCriteria,
  ): Promise<ApiResponse<Map<string, number>>>;
  getTop10Destinations(
    filter: StatisticFilterCriteria,
  ): Promise<ApiResponse<Map<string, number>>>;
}

const apiClient: AxiosInstance = createApiClient("bookings");

class BookingService implements IBookingService {
  async getBookings(
    pagination: PaginationParams,
    filter?: BookingFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<IBooking>>> {
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
  async getBooking(bookingId: string): Promise<ApiResponse<IBooking>> {
    return (await apiClient.get(`/${bookingId}`)).data;
  }

  async update(
    bookingId: number,
    updatedBooking: IBooking,
  ): Promise<ApiResponse<IBooking>> {
    return (await apiClient.put(`/${bookingId}`, updatedBooking)).data;
  }

  async getLast30DaysBookingSales(): Promise<ApiResponse<number>> {
    return (await apiClient.get("/last-30-days-sales")).data;
  }

  async getLast30DaysCount(): Promise<ApiResponse<number>> {
    return (await apiClient.get("/last-30-days-count")).data;
  }

  async getSalesStats(
    filter: StatisticFilterCriteria,
  ): Promise<ApiResponse<Map<string, number>>> {
    return (
      await apiClient.get("/sales-stats", {
        params: filter,
      })
    ).data;
  }

  async getTop10Destinations(
    filter: StatisticFilterCriteria,
  ): Promise<ApiResponse<Map<string, number>>> {
    return (
      await apiClient.get("/top-10-destinations", {
        params: filter,
      })
    ).data;
  }
}

export const bookingService = new BookingService();
