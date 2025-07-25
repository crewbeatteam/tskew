import { SearchResult } from "../core/search-result";
import { Api } from "../core/api";

// Mock the Api class
jest.mock("../core/api");
const MockedApi = Api as jest.MockedClass<typeof Api>;

describe("SearchResult", () => {
  let mockApi: jest.Mocked<Api>;

  beforeEach(() => {
    mockApi = new MockedApi("http://test.api") as jest.Mocked<Api>;
    jest.clearAllMocks();
  });

  test("should create SearchResult with string query", () => {
    const searchResult = new SearchResult(mockApi, "Poa annua");
    expect(searchResult).toBeDefined();
    expect(searchResult).toBeInstanceOf(SearchResult);
  });

  test("should create SearchResult with dict query", () => {
    const query = { genus: "Poa", species: "annua" };
    const searchResult = new SearchResult(mockApi, query);
    expect(searchResult).toBeDefined();
    expect(searchResult).toBeInstanceOf(SearchResult);
  });

  test("should create SearchResult with filters", () => {
    const query = { genus: "Poa" };
    const filters = "accepted_names";
    const searchResult = new SearchResult(mockApi, query, filters);
    expect(searchResult).toBeDefined();
    expect(searchResult).toBeInstanceOf(SearchResult);
  });

  test("should create SearchResult with default limit", () => {
    const query = "Poa annua";
    const defaultLimit = 20;
    const searchResult = new SearchResult(mockApi, query, null, defaultLimit);
    expect(searchResult).toBeDefined();
  });

  test("should throw error when iterating without running query first", () => {
    const searchResult = new SearchResult(mockApi, "test");
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const item of searchResult) {
        // This should throw
      }
    }).toThrow("Must call runQuery() first or use async methods");
  });

  test("should prevent infinite loops with stuck cursors", async () => {
    // Mock API that returns the same cursor repeatedly (problematic scenario)
    mockApi.get = jest.fn().mockResolvedValue({
      results: [{ name: "Test" }],
      cursor: "stuck-cursor",
    });

    const searchResult = new SearchResult(mockApi, "test query");
    const results = await searchResult.all();

    // Should make 2 requests: initial + one retry before detecting stuck cursor
    expect(mockApi.get).toHaveBeenCalledTimes(2);
    expect(results).toHaveLength(2); // Gets results from both calls before stopping
  });

  test("should handle empty results gracefully", async () => {
    // Mock API that returns empty results
    mockApi.get = jest.fn().mockResolvedValue({
      results: [],
      cursor: null,
    });

    const searchResult = new SearchResult(mockApi, "empty query");
    const results = await searchResult.all();

    expect(mockApi.get).toHaveBeenCalledTimes(1);
    expect(results).toHaveLength(0);
  });

  test("should stop when cursor does not change", async () => {
    let callCount = 0;
    mockApi.get = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve({
          results: [{ name: "Item1" }],
          cursor: "cursor1",
        });
      } else {
        // Return same cursor - should trigger infinite loop protection
        return Promise.resolve({
          results: [{ name: "Item2" }],
          cursor: "cursor1", // Same cursor as before
        });
      }
    });

    const searchResult = new SearchResult(mockApi, "test");
    const results = await searchResult.all();

    expect(mockApi.get).toHaveBeenCalledTimes(2);
    expect(results).toHaveLength(2); // Gets results from both calls before detecting stuck cursor
  });
});
