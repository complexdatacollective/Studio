'use server';

import { db } from '~/drizzle/db';
import { projects } from '~/drizzle/schema';
import { getOrgBySlug } from '~/actions/organizations';
import { eq } from 'drizzle-orm';
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

export async function getProjectBySlug(slug: string) {
  return await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
    columns: {
      id: false,
    },
  });
}

export async function getProjects(orgSlug: string) {
  const organization = await getOrgBySlug(orgSlug);
  if (!organization?.id) {
    throw new Error('Organization not found');
  }

  return await db.query.projects.findMany({
    where: eq(projects.organizationId, organization.id),
    columns: {
      id: false,
    },
  });
}
