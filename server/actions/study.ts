'use server';

import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';
import { generatePublicId } from '~/lib/generatePublicId';

export async function createStudy(formData: FormData) {
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

  safeRevalidateTag('studies:get');
}
