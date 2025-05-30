import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";
import { error } from "node:console";

export default async function migrations(request, response) {
  // const allowedMethods = ["GET", "POST"];
  // if (!allowedMethods.includes(request.method)) {
  //   return response.status(405).json({
  //     error: `Method "${request.method}" not allowed`,
  //   });
  // }

  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  try {
    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }

    return response.status(405).json({
      error: `Method ${request.method} not supported for /migrations.`,
    });
  } catch (error) {
    console.error("Error running migration: ", error);
    // throw error;
    return response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    await dbClient.end();
  }
}
