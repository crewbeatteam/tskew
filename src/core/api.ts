import axios, { AxiosInstance, AxiosResponse } from "axios";
import { QueryParam, RequestConfig } from "./types";

export class Api {
  private client: AxiosInstance;
  private baseUrl: string;
  private config: RequestConfig;

  constructor(baseUrl: string, config: RequestConfig = {}) {
    this.baseUrl = baseUrl;
    this.config = {
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      ...config,
    };

    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  private buildUrl(endpoint: string, params: QueryParam = {}): string {
    // Ensure baseUrl ends with / and endpoint starts with /
    const baseUrlNormalized = this.baseUrl.endsWith("/")
      ? this.baseUrl
      : this.baseUrl + "/";
    const endpointNormalized = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;

    const url = new URL(endpointNormalized, baseUrlNormalized);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  private async makeRequest<T>(
    url: string,
    retryCount = 0
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client.get<T>(url);
      return response;
    } catch (error: any) {
      // Match pykew behavior: retry on status code 249 (rate limit)
      if (error.response?.status === 249 && retryCount < this.config.retries!) {
        // Wait 5 seconds like pykew does
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return this.makeRequest<T>(url, retryCount + 1);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, params: QueryParam = {}): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    const response = await this.makeRequest<T>(url);
    return response.data;
  }
}
