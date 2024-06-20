'use server';

import { getServerSession } from '~/lib/auth';
import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';
import { generatePublicId } from '~/lib/generatePublicId';

export async function createStudy(formData: FormData) {
  const name = formData.get('studyName') as string;
  const { session } = await getServerSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  if (!name) {
    throw new Error('Study name is required');
  }

  await db.study.create({
    data: {
      publicId: generatePublicId(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      users: {
        create: {
          userId: session.userId,
          role: 'STAFF',
        },
      },
    },
  });

  safeRevalidateTag('getOrganizations');
}

export async function updateStudy(slug: string, formData: FormData) {
  const description = formData.get('studyDescription') as string;

  if (!description) {
    throw new Error('Study description is required');
  }

  await db.study.update({
    where: {
      slug,
    },
    data: {
      description,
    },
  });

  safeRevalidateTag(`getStudyBySlug-${slug}`);
}
