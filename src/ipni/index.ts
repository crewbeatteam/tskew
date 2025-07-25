import { Api, SearchResult, QueryParam, FilterParam, RequestConfig } from "../core";
import { IpniName, IpniAuthor, IpniPublication } from "./types";

const IPNI_URL = "https://www.ipni.org/api/1";

const api = new Api(IPNI_URL);

export function search(
  query: string | QueryParam = {},
  filters?: FilterParam | FilterParam[],
  config?: RequestConfig
): SearchResult<IpniName> {
  const apiInstance = config ? new Api(IPNI_URL, config) : api;
  return new SearchResult<IpniName>(apiInstance, query, filters || null);
}

export async function lookupName(id: string, config?: RequestConfig): Promise<IpniName> {
  const apiInstance = config ? new Api(IPNI_URL, config) : api;
  return apiInstance.get<IpniName>(`n/${id}`);
}

export async function lookupAuthor(id: string, config?: RequestConfig): Promise<IpniAuthor> {
  const apiInstance = config ? new Api(IPNI_URL, config) : api;
  return apiInstance.get<IpniAuthor>(`a/${id}`);
}

export async function lookupPublication(id: string, config?: RequestConfig): Promise<IpniPublication> {
  const apiInstance = config ? new Api(IPNI_URL, config) : api;
  return apiInstance.get<IpniPublication>(`p/${id}`);
}

export * from "./types";
export * from "./terms";
