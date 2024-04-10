'use client';

import { useQuery } from 'convex/react';
import { Settings } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

export default function ProjectDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  if (!params.project || typeof params.project !== 'string') {
    return null;
  }

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
    <div className='flex justify-between p-12'>
      <Typography variant='h2'>Project Dashboard: {project?.name}</Typography>
      <Link href={`/${params.organization}/${params.project}/settings`}>
        <Button variant='outline' size='icon'>
          <Settings className='h-4 w-4' />
        </Button>
      </Link>
    </div>
  );
}
