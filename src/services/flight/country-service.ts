import { AxiosInstance } from "axios";
import { ApiResponse, ICountry } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ICountryService {
  getAll(): Promise<ApiResponse<ICountry[]>>;
}

const apiClient: AxiosInstance = createApiClient("countries", { auth: false });
class CountryService implements ICountryService {
  async getAll(): Promise<ApiResponse<ICountry[]>> {
    return (await apiClient.get("/all")).data;
  }
}
export const countryService = new CountryService();
