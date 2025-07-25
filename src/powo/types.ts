export interface PowoTaxon {
  fqId: string;
  name: string;
  authors?: string;
  rank?: string;
  family?: string;
  genus?: string;
  species?: string;
  accepted?: boolean;
  synonym?: boolean;
  hybrid?: boolean;
  images?: PowoImage[];
  distribution?: PowoDistribution[];
  characteristics?: PowoCharacteristic[];
  synonyms?: PowoTaxon[];
  basionym?: PowoTaxon;
  url?: string;
}

export interface PowoImage {
  id: string;
  url: string;
  caption?: string;
  copyright?: string;
  thumbnailUrl?: string;
}

export interface PowoDistribution {
  area: string;
  status: string;
  feature?: string;
}

export interface PowoCharacteristic {
  type: string;
  value: string;
  source?: string;
}

export interface PowoSearchResult {
  results: PowoTaxon[];
  cursor?: string;
  totalResults?: number;
}