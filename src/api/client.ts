import axios, { AxiosInstance } from "axios";
import { ApiResponse, ApiError, JWT } from "../types/index";

class APIClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
    this.client.interceptors.request.use((config: any) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await this.client.get(url);
      return { data: res.data, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: this.handleError(error),
      };
    }
  }

  async save<T>(url: string, data: any): Promise<ApiResponse<T>> {
    try {
      const res = await this.client.post(url, data);
      return { data: res.data, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: this.handleError(error),
      };
    }
  }

  async remove<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await this.client.delete(url);
      return { data: res.data, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: this.handleError(error),
      };
    }
  }

  async authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<JWT>> {
    try {
      const res = await this.client.post("/auth", credentials);
      return { data: res.data, success: true };
    } catch (error: any) {
      return {
        data: null as any,
        success: false,
        error: this.handleError(error),
      };
    }
  }

  private handleError(error: any): ApiError {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data?.message || "API Error",
        code: error.response.status,
      };
    }
    return { message: error.message || "Unknown error" };
  }
}

export default APIClient;
