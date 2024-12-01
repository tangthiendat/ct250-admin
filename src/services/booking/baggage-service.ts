import { AxiosInstance } from "axios";
import { ApiResponse, BaggageFilterCriteria, IBaggages, Page, PaginationParams, SortParams } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IBaggageService {
    getBaggages(
        pagination: PaginationParams,
        filter: BaggageFilterCriteria,
        sort?: SortParams,
    ): Promise<ApiResponse<Page<IBaggages>>>;
    create(
        newBaggage: Omit<IBaggages, "baggageId">,
    ): Promise<ApiResponse<IBaggages>>;
    update(
        baggageId: number,
        updatedBaggage: IBaggages,
    ): Promise<ApiResponse<IBaggages>>;
    delete(BaggageId: number): Promise<ApiResponse<void>>;
    getAllBaggages(): Promise<ApiResponse<IBaggages[]>>;
}

const apiClient: AxiosInstance = createApiClient("baggage");

class BaggageService implements IBaggageService {
    async getBaggages(
        pagination: PaginationParams,
        filter?: BaggageFilterCriteria,
        sort?: SortParams,
    ): Promise<ApiResponse<Page<IBaggages>>> {
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
    async create(
        newBaggage: Omit<IBaggages, "baggageId">,
    ): Promise<ApiResponse<IBaggages>> {
        return (await apiClient.post("", newBaggage)).data;
    }

    async update(
        baggageId: number,
        updatedBaggage: IBaggages,
    ): Promise<ApiResponse<IBaggages>> {
        return (await apiClient.put(`/${baggageId}`, updatedBaggage)).data;
    }
    async delete(baggageId: number): Promise<ApiResponse<void>> {
        return (await apiClient.delete(`/${baggageId}`)).data;
    }
    async getAllBaggages(): Promise<ApiResponse<IBaggages[]>> {
        return (await apiClient.get("/all")).data;
    }
}

export const baggageService = new BaggageService();
