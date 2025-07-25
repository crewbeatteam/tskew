import * as ipni from "../ipni";
import { Name, Filters } from "../ipni/terms";

describe("IPNI Module", () => {
  test("should create search result with dict query", () => {
    const query = { [Name.genus]: "Poa", [Name.species]: "annua" };
    const result = ipni.search(query);
    expect(result).toBeDefined();
  });

  test("should create search result with string query", () => {
    const result = ipni.search("Poa annua");
    expect(result).toBeDefined();
  });

  test("should create search result with filters", () => {
    const query = { [Name.genus]: "Poa" };
    const result = ipni.search(query, Filters.familial);
    expect(result).toBeDefined();
  });

  test("should export Name terms with correct values", () => {
    expect(Name.genus).toBe("genus");
    expect(Name.species).toBe("species");
    expect(Name.author).toBe("name author");
    expect(Name.full_name).toBe("full name");
  });

  test("should export Filter terms", () => {
    expect(Filters.familial).toBe("f_familial");
    expect(Filters.generic).toBe("f_generic");
  });
});
