'use client';

import { useQuery } from 'convex/react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Members } from '~/components/Members';

export default function OrganizationSettingsPage() {
  const params = useParams();

  // get the organization by name
  if (!params.organization || typeof params.organization !== 'string') {
    return null;
  }

  const members = useQuery(api.organizations.getMembers, {
    organizationSlug: params.organization,
  });

  console.log(members);

  if (!members) {
    return <div>Loading organization members...</div>;
  }

  return (
    <div className='p-12'>
      <Typography variant='h2'>Organization Settings Page</Typography>
      <Typography variant='h4'>Organization Members</Typography>
      <Members members={members} />
    </div>
  );
}
