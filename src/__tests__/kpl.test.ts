import * as kpl from "../kpl";

describe("KPL Module", () => {
  test("should create search result with query", () => {
    const result = kpl.search("Poa annua");
    expect(result).toBeDefined();
  });

  test("should create search result without query", () => {
    const result = kpl.search();
    expect(result).toBeDefined();
  });

  test("should have lookup function", () => {
    expect(typeof kpl.lookup).toBe("function");
  });
});
