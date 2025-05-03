import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});

// test("Database credentials should not be directly injected into process.env during tests", () => {
//   const dbEnvVars = [
//     "POSTGRES_HOST",
//     "POSTGRES_PORT",
//     "POSTGRES_USER",
//     "POSTGRES_DB",
//     "POSTGRES_PASSWORD",
//     "POSTGRES_CA",
//   ];

//   dbEnvVars.forEach((key) => {
//     expect(process.env[key]).toBeUndefined();
//   });
// });

// test("Migration should be recorded in pgmigrations", async () => {
//   const result = await database.query(`SELECT name FROM pgmigrations`);
//   const migrationNames = result.rows.map((row) => row.name);

//   expect(migrationNames.length).toBeGreaterThan(0);
// });
