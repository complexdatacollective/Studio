'use client';

import { useQuery } from 'convex/react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Members } from '~/components/Members';

export default function OrganizationSettingsPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // get the organization by name
  if (!params.organization || typeof params.organization !== 'string') {
    return null;
  }
  const data = useQuery(api.organizations.getOrgWithProjects, {
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
      <Typography variant='h2'>
        {data?.organization?.name} Organization Settings Page
      </Typography>
      <Typography variant='h4'>Organization Members</Typography>
      {/* <Members members={data?.organization?.administratorId} /> */}
    </div>
  );
}
