import 'server-only';
import { db } from '~/lib/db';
import { createCachedFunction } from '~/lib/cache';
import { headers } from 'next/headers';
import { rateLimit } from '~/lib/rateLimit';

const getHeaders = () => headers();

export const getStudies = async () => {
  const headers = getHeaders();

  return await createCachedFunction(
    async (headers: Headers) => {
      const rateLimitResponse = await rateLimit(headers);
      if (rateLimitResponse) {
        throw new Error('Rate limit exceeded. Too many requests');
      }

      return await db.study.findMany();
    },
    ['getOrganizations'],
  )(headers);
};
