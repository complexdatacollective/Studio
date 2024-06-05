// cannot use import aliases here with knip. see https://knip.dev/reference/known-issues#path-aliases-in-config-files
import { env } from "./env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  out: "./drizzle", // where to output the migration files
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
