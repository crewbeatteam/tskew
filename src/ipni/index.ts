import { Api, SearchResult, QueryParam, FilterParam } from "../core";
import { IpniName, IpniAuthor, IpniPublication } from "./types";

const IPNI_URL = "https://www.ipni.org/api/1";

const api = new Api(IPNI_URL);

export function search(
  query: string | QueryParam = {},
  filters?: FilterParam | FilterParam[]
): SearchResult<IpniName> {
  return new SearchResult<IpniName>(api, query, filters || null);
}

export async function lookupName(id: string): Promise<IpniName> {
  return api.get<IpniName>(`n/${id}`);
}

export async function lookupAuthor(id: string): Promise<IpniAuthor> {
  return api.get<IpniAuthor>(`a/${id}`);
}

export async function lookupPublication(id: string): Promise<IpniPublication> {
  return api.get<IpniPublication>(`p/${id}`);
}

export * from "./types";
export * from "./terms";
