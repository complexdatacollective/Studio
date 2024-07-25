'use server';

import { Role } from '@prisma/client';
import { getServerSession } from '~/lib/auth';
import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';
import { generatePublicId } from '~/lib/generatePublicId';

export async function createStudy(formData: FormData) {
  const { session, user } = await getServerSession();

  if (!session || !user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('studyName') as string;
  const role = formData.get('role') as Role;

  // Todo: return action error object, with localised error messages.
  if (!name) {
    throw new Error('Study name is required');
  }

  if (!role) {
    throw new Error('Role is required');
  }

  // Create a new study, and add the current user as an admin via studyUser
  const study = await db.study.create({
    data: {
      name,
      slug: name.toLowerCase().replace(/\s/g, '-'),
      publicId: generatePublicId(),
      users: {
        create: {
          userId: user.id,
          role: role,
        },
      },
    },
  });

  safeRevalidateTag('studies:get');
}
