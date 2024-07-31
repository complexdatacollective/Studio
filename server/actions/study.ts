'use server';

import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';
import { generatePublicId } from '~/lib/generatePublicId';
import { headers } from 'next/headers';
import { rateLimit } from '~/lib/rateLimit';

export async function createStudy(formData: FormData) {
  const rateLimitResponse = await rateLimit(headers());
  if (rateLimitResponse) {
    // todo: what is the best thing to do here?
    throw new Error('Rate limit exceeded. Too many requests');
  }
  const name = formData.get('studyName') as string;

  if (!name) {
    throw new Error('Study name is required');
  }

  await db.study.create({
    data: {
      publicId: generatePublicId(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    },
  });

  safeRevalidateTag('getOrganizations');
}
