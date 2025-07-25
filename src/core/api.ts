import { QueryParam, RequestConfig } from "./types";

export class Api {
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

  private async makeRequest<T>(url: string, retryCount = 0): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check if response is ok
      if (!response.ok) {
        // Match pykew behavior: retry on status code 249 (rate limit)
        if (response.status === 249 && retryCount < this.config.retries!) {
          // Wait 5 seconds like pykew does
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return this.makeRequest<T>(url, retryCount + 1);
        }

        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}. ${errorText}`
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${this.config.timeout}ms`);
      }

      // For other errors, retry if configured
      if (retryCount < this.config.retries!) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.config.retryDelay)
        );
        return this.makeRequest<T>(url, retryCount + 1);
      }

      throw error;
    }
  }

  async get<T>(endpoint: string, params: QueryParam = {}): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.makeRequest<T>(url);
  }
}
