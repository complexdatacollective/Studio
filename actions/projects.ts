'use server';

import { db } from '~/drizzle/db';
import { projects } from '~/drizzle/schema';
import { getOrgBySlug } from '~/queries/organizations';
import { safeRevalidateTag } from '~/utils/safeCacheTags';

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
