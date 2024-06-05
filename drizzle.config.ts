// cannot use import aliases here with knip. see https://knip.dev/reference/known-issues#path-aliases-in-config-files
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  out: "./drizzle", // where to output the migration files
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: true,
});
