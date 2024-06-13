import { PrismaClient } from '@prisma/client';
import { env } from '~/env';

const createPrismaClient = () =>
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  }).$extends({
    query: {
      async $allOperations({ args, query }) {
        if (env.NODE_ENV === 'development') {
          // Add artificial DB delay in development
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        return query(args);
      },
    },
  });

const globalForPrisma = globalThis as unknown as {
  db: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.db ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.db = db;
