'use server';

import { safeRevalidateTag } from '~/utils/safeCacheTags';
import { db } from '~/drizzle/db';
import { organizations } from '~/drizzle/schema';

export async function createOrganization(formData: FormData) {
  const name = formData.get('orgName') as string;

  if (!name) {
    throw new Error('Organization name is required');
  }

  await db.insert(organizations).values({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  });

  safeRevalidateTag('getOrganizations');
}
