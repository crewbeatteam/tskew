export interface KplTaxon {
  id: string;
  name: string;
  authors?: string;
  rank?: string;
  family?: string;
  genus?: string;
  species?: string;
  accepted?: boolean;
  synonym?: boolean;
  url?: string;
}
