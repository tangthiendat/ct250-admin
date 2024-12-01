import { AxiosInstance } from "axios";
import {
  ApiResponse,
  ITicket,
  Page,
  PaginationParams,
  SortParams,
  TicketFilterCriteria,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface ITicketService {
  getTickets(
    pagination: PaginationParams,
    filter: TicketFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<ITicket>>>;
  update(
    ticketId: number,
    updatedTicket: ITicket,
  ): Promise<ApiResponse<ITicket>>;
  delete(ticketId: number): Promise<ApiResponse<void>>;
  getLast30DaysCount(): Promise<ApiResponse<number>>;
}

const apiClient: AxiosInstance = createApiClient("tickets");

class TicketService implements ITicketService {
  async getTickets(
    pagination: PaginationParams,
    filter?: TicketFilterCriteria,
    sort?: SortParams,
  ): Promise<ApiResponse<Page<ITicket>>> {
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
    ticketId: number,
    updatedTicket: ITicket,
  ): Promise<ApiResponse<ITicket>> {
    return (await apiClient.put(`/${ticketId}`, updatedTicket)).data;
  }
  async delete(ticketId: number): Promise<ApiResponse<void>> {
    return (await apiClient.delete(`/${ticketId}`)).data;
  }

  async getLast30DaysCount(): Promise<ApiResponse<number>> {
    return (await apiClient.get("/last-30-days-count")).data;
  }
}

export const ticketService = new TicketService();
