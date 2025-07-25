import { Api, SearchResult, RequestConfig } from "../core";
import { KplTaxon } from "./types";

const KPL_URL = "https://wcvp.science.kew.org/api/v1";

const api = new Api(KPL_URL);

export function search(query?: string, config?: RequestConfig): SearchResult<KplTaxon> {
  const apiInstance = config ? new Api(KPL_URL, config) : api;
  return new SearchResult<KplTaxon>(apiInstance, query || "", null);
}

export async function lookup(id: string, config?: RequestConfig): Promise<KplTaxon> {
  const apiInstance = config ? new Api(KPL_URL, config) : api;
  return apiInstance.get<KplTaxon>(`taxon/${id}`);
}

export * from "./types";
