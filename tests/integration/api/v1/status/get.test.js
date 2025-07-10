import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // expect(responseBody.postgres_version).toBeDefined();
  // expect(responseBody.max_connections).toBeDefined();
  // expect(responseBody.current_connections).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);

  // expect(typeof responseBody.postgres_version).toBe("string");
  // expect(responseBody.postgres_version).toMatch(/PostgreSQL\s+\d+(\.\d+)?/);

  // expect(typeof responseBody.max_connections).toBe("number");
  // expect(Number.isInteger(responseBody.max_connections)).toBe(true);

  // expect(typeof responseBody.current_connections).toBe("number");
  // expect(Number.isInteger(responseBody.current_connections)).toBe(true);

  // expect(responseBody.current_connections).toBeLessThanOrEqual(
  //   responseBody.max_connections,
  // );
});
