import { Api, SearchResult, QueryParam, FilterParam, RequestConfig } from "../core";
import { PowoTaxon } from "./types";

const POWO_URL = "https://powo.science.kew.org/api/1";

const api = new Api(POWO_URL);

export function search(
  query: string | QueryParam = {},
  filters?: FilterParam | FilterParam[],
  config?: RequestConfig
): SearchResult<PowoTaxon> {
  const apiInstance = config ? new Api(POWO_URL, config) : api;
  return new SearchResult<PowoTaxon>(apiInstance, query, filters || null);
}

export async function lookup(
  id: string,
  include: string[] = [],
  config?: RequestConfig
): Promise<PowoTaxon> {
  const params: QueryParam = {};
  if (include.length > 0) {
    params.fields = include.join(",");
  }

  const apiInstance = config ? new Api(POWO_URL, config) : api;
  return apiInstance.get<PowoTaxon>(`taxon/${id}`, params);
}

export * from "./types";
export * from "./terms";
