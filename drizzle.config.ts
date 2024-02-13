import { type Config } from "drizzle-kit";

// import { env } from "~/env.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  schema: "./src/server/db/schema.ts",
  out: './migrations',
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
  // tablesFilter: ["whiteboard_*"],
} satisfies Config;
