import { AxiosInstance } from "axios";
import { ApiResponse, BookingFilterCriteria, IBooking, Page, PaginationParams, SortParams } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IBookingService {
    getBookings(
        pagination: PaginationParams,
        filter: BookingFilterCriteria,
        sort?: SortParams,
    ): Promise<ApiResponse<Page<IBooking>>>;
    update(
        bookingId: number,
        updatedBooking: IBooking,
    ): Promise<ApiResponse<IBooking>>;
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

    async update(
        bookingId: number,
        updatedBooking: IBooking,
    ): Promise<ApiResponse<IBooking>> {
        return (await apiClient.put(`/${bookingId}`, updatedBooking)).data;
    }
}

export const bookingService = new BookingService();
