import * as powo from "../powo";
import { Name, Geography, Filters } from "../powo/terms";

describe("POWO Module", () => {
  test("should create search result with dict query", () => {
    const query = { [Name.genus]: "Poa", [Geography.distribution]: "Africa" };
    const result = powo.search(query);
    expect(result).toBeDefined();
  });

  test("should create search result with string query", () => {
    const result = powo.search("Poa annua");
    expect(result).toBeDefined();
  });

  test("should create search result with filters", () => {
    const query = { [Name.genus]: "Poa" };
    const result = powo.search(query, Filters.accepted);
    expect(result).toBeDefined();
  });

  test("should export Name terms with correct values", () => {
    expect(Name.genus).toBe("genus");
    expect(Name.species).toBe("species");
    expect(Name.full_name).toBe("name");
    expect(Geography.distribution).toBe("location");
  });

  test("should export Filter terms", () => {
    expect(Filters.accepted).toBe("accepted_names");
    expect(Filters.has_images).toBe("has_images");
  });
});
