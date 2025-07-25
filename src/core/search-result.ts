import { Api } from "./api";
import { QueryParam, FilterParam } from "./types";

export class SearchResult<T = any> implements Iterable<T> {
  private api: Api;
  private query: string | QueryParam;
  private filters: FilterParam | FilterParam[] | null;
  private results: T[] | null = null;
  private resultIndex = 0;
  private cursor = "*";
  private perPage = 10;
  private defaultLimit?: number = 10;

  constructor(
    api: Api,
    query: string | QueryParam = {},
    filters: FilterParam | FilterParam[] | null = null,
    defaultLimit?: number
  ) {
    this.api = api;
    this.query = query;
    this.filters = filters;
    this.defaultLimit = defaultLimit;
  }

  private formatQuery(): string {
    if (typeof this.query === "string") {
      return this.query;
    }

    // Convert dict query to key:value format for modern APIs
    const terms: string[] = [];
    for (const [key, value] of Object.entries(this.query)) {
      if (value !== undefined && value !== null) {
        // For genus/species queries, use key:value format
        if (key === "genus" || key === "species" || key === "family") {
          terms.push(`${key}:${value}`);
        } else {
          terms.push(`${key}:"${value}"`);
        }
      }
    }
    return terms.join(" ");
  }

  private formatFilters(): string {
    if (!this.filters) return "";

    if (Array.isArray(this.filters)) {
      return this.filters.map((f) => String(f)).join(",");
    }

    return String(this.filters);
  }

  private buildParams(): QueryParam {
    const params: QueryParam = {
      perPage: this.perPage,
    };

    const queryStr = this.formatQuery();
    if (queryStr) {
      params.q = queryStr;
    }

    const filtersStr = this.formatFilters();
    if (filtersStr) {
      params.f = filtersStr;
    }

    if (this.cursor && this.cursor !== "*") {
      params.cursor = this.cursor;
    }

    return params;
  }

  private async runQuery(limit?: number): Promise<void> {
    if (this.results !== null) return;

    this.results = [];
    this.cursor = "*";
    const effectiveLimit = limit || this.defaultLimit;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const params = this.buildParams();
      const response = await this.api.get<any>("search", params);

      if (response.results && Array.isArray(response.results)) {
        this.results.push(...response.results);

        // Stop if we have enough results
        if (effectiveLimit && this.results.length >= effectiveLimit) {
          this.results = this.results.slice(0, effectiveLimit);
          break;
        }

        if (response.cursor) {
          this.cursor = response.cursor;
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  *[Symbol.iterator](): Iterator<T> {
    if (this.results === null) {
      throw new Error("Must call runQuery() first or use async methods");
    }

    for (const result of this.results) {
      yield result;
    }
  }

  async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
    await this.runQuery();

    for (const result of this.results!) {
      yield result;
    }
  }

  async all(): Promise<T[]> {
    await this.runQuery();
    return [...this.results!];
  }

  async first(): Promise<T | undefined> {
    await this.runQuery(1);
    return this.results![0];
  }

  async size(): Promise<number> {
    await this.runQuery();
    return this.results!.length;
  }

  async take(n: number): Promise<T[]> {
    await this.runQuery(n);
    return this.results!.slice(0, n);
  }
}
