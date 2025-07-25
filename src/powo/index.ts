import { Api, SearchResult, QueryParam, FilterParam } from '../core';
import { PowoTaxon } from './types';

const POWO_URL = 'https://powo.science.kew.org/api/1';

const api = new Api(POWO_URL);

export function search(
  query: string | QueryParam = {},
  filters?: FilterParam | FilterParam[]
): SearchResult<PowoTaxon> {
  return new SearchResult<PowoTaxon>(api, query, filters || null);
}

export async function lookup(
  id: string,
  include: string[] = []
): Promise<PowoTaxon> {
  const params: QueryParam = {};
  if (include.length > 0) {
    params.fields = include.join(',');
  }
  
  return api.get<PowoTaxon>(`taxon/${id}`, params);
}

export * from './types';
export * from './terms';