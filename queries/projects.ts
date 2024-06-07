import { db } from '~/drizzle/db';
import { unstable_cache } from 'next/cache';
import 'server-only';
import { eq } from 'drizzle-orm';
import { getOrgBySlug } from '~/queries/organizations';
import { projects } from '~/drizzle/schema';

export const getProjectBySlug = (slug: string) =>
  unstable_cache(
    async (slug: string) => {
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
  )(slug);

export const getProjects = (orgSlug: string) =>
  unstable_cache(
    async (orgSlug: string) => {
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
  )(orgSlug);
