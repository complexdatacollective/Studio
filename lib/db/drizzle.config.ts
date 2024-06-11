// cannot use import aliases here with knip. see https://knip.dev/reference/known-issues#path-aliases-in-config-files
import { defineConfig } from 'drizzle-kit';
import { env } from '../../env';

export default defineConfig({
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  out: './lib/db', // where to output the migration files
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
