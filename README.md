# tskew

TypeScript interface to Kew Gardens botanical data services.

A complete TypeScript port of the Python [pykew](https://github.com/RBGKew/pykew) library, providing easy access to:

- **IPNI** (International Plant Names Index) - botanical nomenclatural data
- **POWO** (Plants of the World Online) - taxonomic and botanical information  
- **KPL** (Kew Plant List) - plant list data

## Installation

```bash
npm install tskew
```

## Usage

### String Queries

```typescript
import * as ipni from 'tskew/ipni';
import * as powo from 'tskew/powo';

// Simple string search
const results = ipni.search('Poa annua');
const powoResults = powo.search('Poa annua');

// Iterate through results
for await (const name of results) {
  console.log(name);
}
```

### Advanced Dictionary Queries

```typescript
import * as ipni from 'tskew/ipni';
import { Name, Filters } from 'tskew/ipni';

const query = { 
  [Name.genus]: 'Poa', 
  [Name.species]: 'annua',
  [Name.author]: 'L.'
};

const results = ipni.search(query, Filters.familial);

// Get all results at once
const allResults = await results.all();

// Get just the first result
const firstResult = await results.first();

// Count results
const count = await results.size();
```

### POWO Search

```typescript
import * as powo from 'tskew/powo';
import { Name, Geography, Filters } from 'tskew/powo';

const query = { 
  [Name.genus]: 'Poa', 
  [Geography.distribution]: 'Africa' 
};

const results = powo.search(query, Filters.accepted);

for await (const taxon of results) {
  console.log(taxon.name, taxon.authors);
}
```

### KPL Search

```typescript
import * as kpl from 'tskew/kpl';

// Search all
const allResults = kpl.search();

// Search with query
const results = kpl.search('Poa');

for await (const taxon of results) {
  console.log(taxon.name);
}
```

### Lookup Operations

```typescript
// IPNI lookups
const name = await ipni.lookupName('320035-2');
const author = await ipni.lookupAuthor('12653-1');
const publication = await ipni.lookupPublication('1071-2');

// POWO lookup with additional fields
const taxon = await powo.lookup('123456', ['distribution', 'descriptions']);

// KPL lookup
const kplTaxon = await kpl.lookup('123456');
```

## Complete API Reference

### IPNI Name Terms
- `Name.added` - "added"
- `Name.author` - "name author"
- `Name.basionym` - "basionym"
- `Name.basionym_author` - "basionym author"
- `Name.bibliographic_reference` - "bibliographic reference"
- `Name.citation_type` - "citation type"
- `Name.collection_number` - "collection number"
- `Name.collectors` - "collector team"
- `Name.distribution` - "distribution"
- `Name.family` - "family"
- `Name.full_name` - "full name"
- `Name.genus` - "genus"
- `Name.in_powo` - "in powo"
- `Name.infrafamily` - "infrafamily"
- `Name.infragenus` - "infragenus"
- `Name.infraspecies` - "infraspecies"
- `Name.modified` - "modified"
- `Name.name_status` - "name status"
- `Name.published` - "published"
- `Name.published_in` - "published in"
- `Name.publishing_author` - "publishing author"
- `Name.rank` - "rank"
- `Name.scientific_name` - "scientific name"
- `Name.species` - "species"
- `Name.species_author` - "species author"
- `Name.version` - "version"

### IPNI Author Terms
- `Author.forename` - "author forename"
- `Author.full_name` - "author name"
- `Author.standard_form` - "author std"
- `Author.surname` - "author surname"

### IPNI Publication Terms
- `Publication.standard_form` - "publication std"
- `Publication.bph_number` - "bph number"
- `Publication.date` - "date"
- `Publication.isbn` - "isbn"
- `Publication.issn` - "issn"
- `Publication.lc_number` - "lc number"
- `Publication.preceded_by` - "preceded by"
- `Publication.superceded_by` - "superceded by"
- `Publication.title` - "publication title"
- `Publication.tl2_author` - "tl2 author"
- `Publication.tl2_number` - "tl2 number"

### IPNI Filters
- `Filters.familial` - "f_familial"
- `Filters.infrafamilial` - "f_infrafamilial"
- `Filters.generic` - "f_generic"
- `Filters.infrageneric` - "f_infrageneric"
- `Filters.specific` - "f_specific"

### POWO Name Terms
- `Name.full_name` - "name"
- `Name.common_name` - "common name"
- `Name.kingdom` - "kingdom"
- `Name.family` - "family"
- `Name.genus` - "genus"
- `Name.species` - "species"
- `Name.author` - "author"

### POWO Characteristic Terms
- `Characteristic.summary` - "summary"
- `Characteristic.appearance` - "appearance"
- `Characteristic.characteristic` - "characteristic"
- `Characteristic.flower` - "flower"
- `Characteristic.fruit` - "fruit"
- `Characteristic.leaf` - "leaf"
- `Characteristic.inflorescence` - "inflorescence"
- `Characteristic.seed` - "seed"
- `Characteristic.cloning` - "cloning"
- `Characteristic.use` - "use"

### POWO Geography Terms
- `Geography.distribution` - "location"

### POWO Filters
- `Filters.accepted` - "accepted_names"
- `Filters.has_images` - "has_images"
- `Filters.families` - "families_f"
- `Filters.genera` - "genus_f"
- `Filters.species` - "species_f"
- `Filters.infraspecies` - "infraspecific_f"

### SearchResult Methods

- `[Symbol.asyncIterator]()` - Async iteration support
- `all()` - Get all results as array
- `first()` - Get first result  
- `size()` - Get total count
- `take(n)` - Get first n results

## License

MIT