'use client';

import { useOrganization } from '@clerk/nextjs';
import { Typography } from '~/components/Typography';
import { redirect } from 'next/navigation';

export default function Home() {
  const { organization } = useOrganization();

  if (organization) {
    redirect(`/${organization.slug}`);
  }

  return (
    <div className='flex flex-col p-12'>
      <Typography variant='h2'>Personal Account Dashboard</Typography>
      <Typography variant='h4'>
        Select an Organization from the top navigation bar to view its projects.
      </Typography>
    </div>
  );
}
