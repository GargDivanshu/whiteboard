import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
// import { env } from "~/env.js";
import * as dotenv from "dotenv";
import * as schema from "./schema";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
    console.log('🔴 no database URL');
  }

  const client = postgres(process.env.DATABASE_URL, { max: 1 });
  export const db = drizzle(client, { schema });
  const migrateDb = async () => {
    try {
        console.log("migration started . . .")
        await migrate(db, { migrationsFolder: "migrations" })
        console.log("migration done")
    } catch(err) {
        console.log(err);
    }
}

// await migrateDb()
