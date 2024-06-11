import { env } from '~/env';
import * as schema from './schema';
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const globalForDb = globalThis as unknown as {
  db: PostgresJsDatabase<typeof schema> | undefined;
};

const pg: ReturnType<typeof postgres> = postgres(env.DATABASE_URL);

export const db = globalForDb.db ?? drizzle(pg, { schema });

if (env.NODE_ENV !== 'production') globalForDb.db = db;
