export interface IpniName {
  id: string;
  genus?: string;
  species?: string;
  infraspecies?: string;
  rank?: string;
  author?: string;
  family?: string;
  fullname?: string;
  published?: boolean;
  publicationYear?: number;
  reference?: string;
  url?: string;
}

export interface IpniAuthor {
  id: string;
  forename?: string;
  surname?: string;
  standardForm?: string;
  dates?: string;
  alternativeNames?: string[];
  examples?: IpniName[];
}

export interface IpniPublication {
  id: string;
  title?: string;
  abbreviation?: string;
  bphNumber?: string;
  date?: string;
  isbn?: string;
  issn?: string;
  lcNumber?: string;
  tl2Author?: string;
  tl2Number?: string;
  remarks?: string;
  preceded_by?: string;
  superceded_by?: string;
}