'use client';

import { Typography } from '~/components/Typography';
import { Button } from '~/components/ui/button';
import { api } from '~/convex/_generated/api';
import { useParams } from 'next/navigation';
import { ProjectCard } from '~/components/ProjectCard';
import { CreateProject } from '~/components/CreateProject';
import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useQueryWithAuth } from '~/hooks/useAuth';

export default function OrganizationDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  if (!params.organization || typeof params.organization !== 'string') {
    return null;
  }

  const userOrganization = useQueryWithAuth(
    api.organizations.getUserOrganization,
    {
      organizationSlug: params.organization,
    }
  );

  const data = useQueryWithAuth(api.organizations.getOrgWithProjects, {
    organizationSlug: params.organization,
  });

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading organization dashboard...</div>;
  }

  if ((!isLoading && !data) || !data?.organization) {
    return (
      <div className='flex flex-col p-12'>
        <Typography variant='h2'>Organization Not Found</Typography>
        <Typography variant='h4'>
          Select an organization to view projects.
        </Typography>
      </div>
    );
  }

  return (
    <div className='p-12'>
      <div className='flex justify-between'>
        <Typography variant='h2'>
          {data?.organization?.name} Projects
        </Typography>
        {userOrganization?.role === 'Administrator' && (
          <div className='flex flex-row space-x-2'>
            <CreateProject organization={data?.organization} />
            <Link href={`/${params.organization}/settings`}>
              <Button variant='outline' size='icon'>
                <Settings className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className='grid grid-cols-4 space-x-4 space-y-4'>
        {data?.projects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
