'use client';

import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';

export default function ProjectDashboard() {
  const params = useParams();

  if (!params.project || typeof params.project !== 'string') {
    return null;
  }

  const project = useQuery(api.projects.getProject, {
    projectSlug: params.project,
  });

  if (!project) {
    return <div>Loading project dashboard...</div>;
  }

  return (
    <div className='flex flex-col p-12'>
      <Typography variant='h2'>Project Dashboard: {project?.name}</Typography>
      <Typography variant='h4'>Description: {project?.description}</Typography>
    </div>
  );
}
