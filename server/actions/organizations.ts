'use server';

import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';
import { organizations } from '~/lib/db/schema';
import { generatePublicId } from '~/lib/generatePublicId';

export async function createOrganization(formData: FormData) {
  const name = formData.get('orgName') as string;

  if (!name) {
    throw new Error('Organization name is required');
  }

  await db.insert(organizations).values({
    name,
    public_id: generatePublicId(),
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  });

  safeRevalidateTag('getOrganizations');
}
