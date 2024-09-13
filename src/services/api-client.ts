import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiOptions {
  auth: boolean;
}

export function createApiClient(
  resourceUrl: string,
  options: ApiOptions = { auth: true },
) {
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/${resourceUrl}`,
  });
  if (options.auth) {
    axiosInstance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }
  return axiosInstance;
}
