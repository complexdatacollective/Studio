import { env } from '~/env';
import * as schema from './schema';
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

declare global {
  // Todo: figure out how to fix linting here
  // eslint-disable-next-line no-var
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;
const pg: ReturnType<typeof postgres> = postgres(env.DATABASE_URL);

if (env.NODE_ENV === 'production') {
  db = drizzle(pg, { schema });
} else {
  if (!global.db) {
    global.db = drizzle(pg, { schema });
  }
  db = global.db;
}

export { db };
