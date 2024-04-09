'use client';

import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';

export default function ProjectDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const project = useQuery(api.projects.getBySlug, {
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
    <div className='p-12'>
      <Typography variant='h2'>Project Dashboard: {project?.name}</Typography>
    </div>
  );
}
