export const Name = {
  full_name: 'name',
  common_name: 'common name',
  kingdom: 'kingdom',
  family: 'family',
  genus: 'genus',
  species: 'species',
  author: 'author'
} as const;

export const Characteristic = {
  summary: 'summary',
  appearance: 'appearance',
  characteristic: 'characteristic',
  flower: 'flower',
  fruit: 'fruit',
  leaf: 'leaf',
  inflorescence: 'inflorescence',
  seed: 'seed',
  cloning: 'cloning',
  use: 'use'
} as const;

export const Geography = {
  distribution: 'location'
} as const;

export const Filters = {
  accepted: 'accepted_names',
  has_images: 'has_images',
  families: 'families_f',
  genera: 'genus_f',
  species: 'species_f',
  infraspecies: 'infraspecific_f'
} as const;

export type NameTerms = typeof Name[keyof typeof Name];
export type CharacteristicTerms = typeof Characteristic[keyof typeof Characteristic];
export type GeographyTerms = typeof Geography[keyof typeof Geography];
export type FilterTerms = typeof Filters[keyof typeof Filters];