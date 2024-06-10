'use server';

import { db } from '~/lib/db';
import { projects } from '~/lib/db/schema';
import { getOrgBySlug } from '~/server/queries/organizations';
import { safeRevalidateTag } from '~/lib/safeCacheTags';

export async function createProject(formData: FormData) {
  const name = formData.get('projectName') as string;
  const orgSlug = formData.get('orgSlug') as string;

  if (!name) {
    throw new Error('Project name is required');
  }

  if (!orgSlug) {
    throw new Error('Organization slug is required');
  }

  const organization = await getOrgBySlug(orgSlug);
  if (!organization?.id) {
    throw new Error('Organization not found');
  }

  await db.insert(projects).values({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    organizationId: organization.id,
  });

  safeRevalidateTag('getProjects');
}
