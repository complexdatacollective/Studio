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
let pg: ReturnType<typeof postgres>;

if (env.NODE_ENV === 'production') {
  pg = postgres(env.DATABASE_URL);
  db = drizzle(pg, { schema });
} else {
  if (!global.db) {
    pg = postgres(env.DATABASE_URL);
    global.db = drizzle(pg, { schema });
  }
  db = global.db;
}

export { db };
