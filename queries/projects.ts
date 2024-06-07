import { db } from '~/drizzle/db';
import 'server-only';
import { eq } from 'drizzle-orm';
import { getOrgBySlug } from '~/queries/organizations';
import { type PublicProject, projects } from '~/drizzle/schema';
import { safeUnstableCache } from '~/utils/safeCacheTags';

export const getProjectBySlug = (slug: string) =>
  safeUnstableCache<PublicProject>(
    async () => {
      return await db.query.projects.findFirst({
        where: eq(projects.slug, slug),
        columns: {
          id: false,
        },
      });
    },
    [`getProjectBySlug-${slug}`],
    {
      tags: [`getProjectBySlug-${slug}`, 'getProjectBySlug'],
    },
  )();

export const getProjects = (orgSlug: string) =>
  safeUnstableCache<PublicProject[]>(
    async () => {
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
    },
    [`getProjects-${orgSlug}`],
    {
      tags: [`getProjects-${orgSlug}`, 'getProjects'],
    },
  )();
