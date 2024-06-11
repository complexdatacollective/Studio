import { db } from '~/lib/db';
import 'server-only';
import { eq } from 'drizzle-orm';
import { getOrgBySlug } from '~/server/queries/organizations';
import { projects } from '~/lib/db/schema';
import { createCachedFunction } from '~/lib/cache';

export const getProjectBySlug = (slug: string) =>
  createCachedFunction(async () => {
    return await db.query.projects.findFirst({
      where: eq(projects.slug, slug),
      columns: {
        id: false,
      },
    });
  }, [`getProjectBySlug-${slug}`, 'getProjectBySlug'])();

export const getProjects = (orgSlug: string) =>
  createCachedFunction(async () => {
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
  }, [`getProjects-${orgSlug}`, 'getProjects'])();

export const getAnonymousRecruitmentStatus = (projectSlug: string) =>
  createCachedFunction(async () => {
    const project = await getProjectBySlug(projectSlug);
    return !!project?.allowAnonymousRecruitment;
  }, [`getAnonymousRecruitmentStatus-${projectSlug}`])();
