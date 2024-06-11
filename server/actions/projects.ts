'use server';

import { db } from '~/lib/db';
import { projects } from '~/lib/db/schema';
import { getOrgBySlug } from '~/server/queries/organizations';
import { safeRevalidateTag } from '~/lib/cache';
import { eq } from 'drizzle-orm';
import { generatePublicId } from '~/lib/generatePublicId';


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
    public_id: generatePublicId(),
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    organizationId: organization.id,
  });

  safeRevalidateTag('getProjects');
}

export async function setAnonymousRecruitment(
  projectSlug: string,
  input: boolean,
) {
  try {
    // Simulate a delay to test optimistic UI
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await db
      .update(projects)
      .set({ allowAnonymousRecruitment: input })
      .where(eq(projects.slug, projectSlug));

    safeRevalidateTag('getProjects');
    safeRevalidateTag(`getAnonymousRecruitmentStatus-${projectSlug}`);
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Unable to update project anonymous recruitment status', e);
    return false;
  }
}

export async function getAnonymousRecruitmentStatus(projectSlug: string) {
  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, projectSlug),
    columns: {
      allowAnonymousRecruitment: true,
    },
  });

  return !!project?.allowAnonymousRecruitment;
}
