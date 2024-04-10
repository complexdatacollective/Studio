'use client';

import { useQuery } from 'convex/react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Members } from '~/components/Members';

export default function OrganizationSettingsPage() {
  const params = useParams();

  if (!params.project || typeof params.project !== 'string') {
    return null;
  }

  const members = useQuery(api.projects.getMembers, {
    projectSlug: params.project,
  });

  if (!members) {
    return <div>Loading organization members...</div>;
  }

  return (
    <div className='p-12'>
      <Typography variant='h2'>Project Settings Page</Typography>
      <Typography variant='h4'>Project Members</Typography>
      <Members members={members} />
    </div>
  );
}
