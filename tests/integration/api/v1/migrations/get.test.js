import database from "infra/database.js";
// import dotenv from "dotenv";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

// test("Check if the development environment .env file has been loaded.", () => {
//   dotenv.config({ path: ".env.development" });
//   console.log("Variável de ambiente POSTGRES_USER:", process.env.POSTGRES_USER);
//   expect(process.env.POSTGRES_USER).toBeDefined();
// });
