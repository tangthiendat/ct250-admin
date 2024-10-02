import { AxiosInstance } from "axios";
import { ApiResponse, ICountry } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ICountryService {
  getAllCountries(): Promise<ApiResponse<ICountry[]>>;
}

const apiClient: AxiosInstance = createApiClient("countries", { auth: false });
class CountryService implements ICountryService {
  async getAllCountries(): Promise<ApiResponse<ICountry[]>> {
    return (await apiClient.get("/all")).data;
  }
}
export const countryService = new CountryService();
