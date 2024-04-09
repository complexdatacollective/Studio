'use client';

import { Typography } from '~/components/Typography';

export default function Home() {
  return (
    <div className='flex flex-col p-12'>
      <Typography variant='h2'>Home Page</Typography>
      <Typography variant='h4'>
        Select an organization to view projects.
      </Typography>
    </div>
  );
}
