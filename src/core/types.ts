export interface QueryParam {
  [key: string]: string | number | boolean | undefined;
}

export type FilterParam =
  | string
  | { [key: string]: string | number | boolean | undefined };

export interface SearchOptions {
  perPage?: number;
  cursor?: string;
}

export interface ApiResponse<T = any> {
  data: T[];
  cursor?: string;
  totalPages?: number;
  totalResults?: number;
}

export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}
