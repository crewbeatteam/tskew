import { Api, SearchResult } from '../core';
import { KplTaxon } from './types';

const KPL_URL = 'http://kewplantlist.org/api/v1';

const api = new Api(KPL_URL);

export function search(query?: string): SearchResult<KplTaxon> {
  return new SearchResult<KplTaxon>(api, query || '', null);
}

export async function lookup(id: string): Promise<KplTaxon> {
  return api.get<KplTaxon>(`taxon/${id}`);
}

export * from './types';