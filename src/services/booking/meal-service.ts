import { AxiosInstance } from "axios";
import { ApiResponse, IMeal, Page, PaginationParams, SortParams } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IMealService {
    getMeals(
        pagination: PaginationParams,
        query: string,
        sort?: SortParams,
    ): Promise<ApiResponse<Page<IMeal>>>;
    getAll(): Promise<ApiResponse<IMeal[]>>;
    create(newAirport: FormData): Promise<ApiResponse<IMeal>>;
    update(
        mealId: number,
        updatedMeal: FormData,
    ): Promise<ApiResponse<IMeal>>;
    delete(mealId: number): Promise<ApiResponse<void>>;
}

const apiClient: AxiosInstance = createApiClient("meals");

class MealService implements IMealService {
    async getMeals(
        pagination: PaginationParams,
        query: string,
        sort?: SortParams,
    ): Promise<ApiResponse<Page<IMeal>>> {
        return (
            await apiClient.get("", {
                params: {
                    ...pagination,
                    query,
                    sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
                    direction: sort?.direction !== "" ? sort?.direction : undefined,
                },
            })
        ).data;
    }

    async getAll(): Promise<ApiResponse<IMeal[]>> {
        return (await apiClient.get("/all")).data;
    }

    async create(newAirport: FormData): Promise<ApiResponse<IMeal>> {
        return (await apiClient.post("", newAirport)).data;
    }

    async update(
        mealId: number,
        updatedMeal: FormData,
    ): Promise<ApiResponse<IMeal>> {
        return (await apiClient.put(`/${mealId}`, updatedMeal)).data;
    }
    async delete(mealId: number): Promise<ApiResponse<void>> {
        return (await apiClient.delete(`/${mealId}`)).data;
    }
}

export const mealService = new MealService();
