import { SearchResult } from '../core/search-result';
import { Api } from '../core/api';

// Mock the Api class
jest.mock('../core/api');
const MockedApi = Api as jest.MockedClass<typeof Api>;

describe('SearchResult', () => {
  let mockApi: jest.Mocked<Api>;

  beforeEach(() => {
    mockApi = new MockedApi('http://test.api') as jest.Mocked<Api>;
    jest.clearAllMocks();
  });

  test('should create SearchResult with string query', () => {
    const searchResult = new SearchResult(mockApi, 'Poa annua');
    expect(searchResult).toBeDefined();
    expect(searchResult).toBeInstanceOf(SearchResult);
  });

  test('should create SearchResult with dict query', () => {
    const query = { genus: 'Poa', species: 'annua' };
    const searchResult = new SearchResult(mockApi, query);
    expect(searchResult).toBeDefined();
    expect(searchResult).toBeInstanceOf(SearchResult);
  });

  test('should create SearchResult with filters', () => {
    const query = { genus: 'Poa' };
    const filters = 'accepted_names';
    const searchResult = new SearchResult(mockApi, query, filters);
    expect(searchResult).toBeDefined();
    expect(searchResult).toBeInstanceOf(SearchResult);
  });

  test('should create SearchResult with default limit', () => {
    const query = 'Poa annua';
    const defaultLimit = 20;
    const searchResult = new SearchResult(mockApi, query, null, defaultLimit);
    expect(searchResult).toBeDefined();
  });

  test('should throw error when iterating without running query first', () => {
    const searchResult = new SearchResult(mockApi, 'test');
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const item of searchResult) {
        // This should throw
      }
    }).toThrow('Must call runQuery() first or use async methods');
  });
});