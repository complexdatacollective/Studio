'use client';

import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { ProjectCard } from '~/components/ProjectCard';

import { useQuery } from 'convex/react';
import { Protect, useOrganization } from '@clerk/nextjs';
import { CreateProject } from '~/components/CreateProject';
import { useParams } from 'next/navigation';

export default function OrganizationDashboard() {
  const { organization } = useOrganization();
  const params = useParams();
  const paramsSlug = params.organization;

  /*
  Skip is a built in way to skip the query if other data or dependencies are not ready
  Prevents needing to do complex checks and early returns which cause violations of the hook rules
  For multiple convex queries that rely on one another, you can alternatively use the useQueries hook
  https://docs.convex.dev/api/modules/react#usequeries
  */

  const projects = useQuery(
    api.projects.getOrganizationProjects,
    organization?.id && organization.slug === paramsSlug
      ? { organizationId: organization.id }
      : 'skip'
  );

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-12'>
      <div className='flex justify-between'>
        <Typography variant='h2'>{organization?.name} Projects</Typography>
        <div className='flex flex-row space-x-2'>
          <Protect role='admin'>
            <CreateProject organizationId={organization.id} />
          </Protect>
        </div>
      </div>
      <div className='grid grid-cols-4 space-x-4 space-y-4'>
        {projects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
