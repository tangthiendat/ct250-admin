import { AxiosInstance } from "axios";
import { ApiResponse, ISpecialServices, Page, PaginationParams, SortParams, SpecialServiceFilterCriteria } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ISpecialService {
    getSpecials(pagination: PaginationParams, filter: SpecialServiceFilterCriteria,
        sort?: SortParams): Promise<ApiResponse<Page<ISpecialServices>>>;

    create(newSpecial: FormData): Promise<ApiResponse<ISpecialServices>>;

    update(specialId: number, updatedSpecial: FormData): Promise<ApiResponse<ISpecialServices>>;

    delete(specialId: number): Promise<ApiResponse<void>>;

    getAllSpecials(): Promise<ApiResponse<ISpecialServices[]>>;
}

const apiClient: AxiosInstance = createApiClient("special-services");

class SpecialService implements ISpecialService {
    async getSpecials(pagination: PaginationParams, filter?: SpecialServiceFilterCriteria, sort?: SortParams): Promise<ApiResponse<Page<ISpecialServices>>> {
        return (await apiClient.get("", {
            params: {
                ...pagination,
                ...filter,
                sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
                direction: sort?.direction !== "" ? sort?.direction : undefined,
            },
        })).data;
    }

    async create(newSpecial: FormData): Promise<ApiResponse<ISpecialServices>> {
        return (await apiClient.post("", newSpecial)).data;
    }

    async update(specialServiceId: number, updatedSpecial: FormData): Promise<ApiResponse<ISpecialServices>> {
        return (await apiClient.put(`/${specialServiceId}`, updatedSpecial)).data;
    }

    async delete(specialServiceId: number): Promise<ApiResponse<void>> {
        return (await apiClient.delete(`/${specialServiceId}`)).data;
    }

    async getAllSpecials(): Promise<ApiResponse<ISpecialServices[]>> {
        return (await apiClient.get("/all")).data;
    }
}

export const specialService = new SpecialService();