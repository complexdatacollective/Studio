'use server';

import { eq } from 'drizzle-orm';
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

/*
Right now, this is only used in other actions and the organization is not returned to the user.
If it were, we would need to remove the id from the response (to use the public_id instead)
Need to think about a better way to handle and check for this.
*/

export async function getOrgBySlug(slug: string) {
  return await db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
  });
}

export async function getOrganizations() {
  return await db.query.organizations.findMany({
    columns: {
      id: false,
    },
  });
}
