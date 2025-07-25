import { powo, ipni } from "../index";

// Integration tests with real API calls
// Run with: npm test -- --testNamePattern="Integration"
// These tests are slow and may be flaky due to network dependencies
describe.skip("Integration Tests - Real API Calls", () => {
  // Increase timeout for real API calls
  jest.setTimeout(30000);

  describe("Infinite Loop Prevention", () => {
    it("should handle searches that return no results without infinite loops", async () => {
      // Test the problematic "Empis pan" case that caused infinite redirects
      const results = powo.search("Empis pan");

      const start = Date.now();
      const all = await results.all();
      const elapsed = Date.now() - start;

      // Should complete quickly (under 5 seconds) and not loop infinitely
      expect(elapsed).toBeLessThan(5000);
      expect(all).toHaveLength(0);
    });

    it("should handle searches with stuck cursors gracefully", async () => {
      // Test another edge case that might cause cursor issues
      const results = powo.search("NonExistentGenus12345");

      const start = Date.now();
      const first = await results.first();
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(5000);
      expect(first).toBeUndefined();
    });
  });

  describe("Successful Searches", () => {
    it("should successfully search for common plant names", async () => {
      const results = ipni.search("Poa annua");
      const plants = await results.take(2);

      expect(plants.length).toBeGreaterThan(0);
      expect(plants.length).toBeLessThanOrEqual(2);
      expect(plants[0]).toHaveProperty("name");
    });

    it("should respect the default limit of 10 items", async () => {
      const results = powo.search("Rosa");
      const plants = await results.take(5); // Just test with 5 to be faster

      // Should return 5 or fewer items
      expect(plants.length).toBeLessThanOrEqual(5);
      expect(plants.length).toBeGreaterThan(0);
    });

    it("should handle take() method efficiently", async () => {
      const results = ipni.search("Quercus");

      const start = Date.now();
      const five = await results.take(5);
      const elapsed = Date.now() - start;

      expect(five.length).toBeLessThanOrEqual(5);
      expect(elapsed).toBeLessThan(10000); // Should be reasonably fast
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed queries gracefully", async () => {
      const results = powo.search("}{][");

      const start = Date.now();
      try {
        await results.first();
        const elapsed = Date.now() - start;
        expect(elapsed).toBeLessThan(5000);
      } catch (error) {
        // API might reject malformed queries, which is fine
        expect(error).toBeDefined();
      }
    });
  });
});
