import { AxiosInstance } from "axios";
import {
    ApiResponse,
    IModel,
} from "../../interfaces";
import { createApiClient } from "../api-client";

interface IModelService {
    getAll(): Promise<ApiResponse<IModel[]>>;
    create(model: Omit<IModel, "modelId">): Promise<ApiResponse<IModel>>;

}

const apiClient: AxiosInstance = createApiClient("models");
class ModelService implements IModelService {
    async getAll(): Promise<ApiResponse<IModel[]>> {
        return (await apiClient.get("/all")).data;
    }

    async create(model: Omit<IModel, "modelId">): Promise<ApiResponse<IModel>> {
        return (await apiClient.post("", model)).data;
    }

}

export const modelService = new ModelService();
