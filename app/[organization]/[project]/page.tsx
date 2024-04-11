'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { useQueryWithAuth } from '~/hooks/useAuth';

export default function ProjectDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  if (!params.project || typeof params.project !== 'string') {
    return null;
  }

  const project = useQueryWithAuth(api.projects.getProject, {
    projectSlug: params.project,
  });

  useEffect(() => {
    if (project) {
      setIsLoading(false);
    }
  }, [project]);

  if (isLoading) {
    return <div>Loading project dashboard...</div>;
  }

  return (
    <div className='flex flex-col p-12'>
      <Typography variant='h2'>Project Dashboard: {project?.name}</Typography>
      <Typography variant='h4'>Description: {project?.description}</Typography>
    </div>
  );
}
