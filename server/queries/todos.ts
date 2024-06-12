import 'server-only';
import { db } from '~/lib/db';
import { createCachedFunction } from '~/lib/cache';

export const getTodos = () =>
  createCachedFunction(async () => {
    return await db.todo.findMany();
  }, ['getTodos'])();
