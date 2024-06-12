import 'server-only';
import { db } from '~/lib/db';
import { createCachedFunction } from '~/lib/cache';

export const getStudies = () =>
  createCachedFunction(async () => {
    return await db.study.findMany();
  }, ['getOrganizations'])();
