'use client';

import { useQuery } from 'convex/react';
import { Typography } from '~/components/Typography';
import { Button } from '~/components/ui/button';
import { api } from '~/convex/_generated/api';

export default function Home() {
  return (
    <div className='flex flex-col p-12'>
      <Typography variant='h2'>Home Page</Typography>
      <Typography variant='h4'>
        Select an organization to view projects.{' '}
      </Typography>
    </div>
  );
}
