import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

interface AxiosClient extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
}

const axiosClient: AxiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: "bracket" }),
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
