'use client';

import { useQuery } from 'convex/react';
import { Typography } from '~/components/Typography';
import { Button } from '~/components/ui/button';
import { api } from '~/convex/_generated/api';
import { useParams } from 'next/navigation';

export default function Home() {
  //   const projects = useQuery(api.projects.get, {
  //     organizationId: 'organizationId',
  //   });
  const params = useParams();
  console.log(params.organization);

  return (
    <div className='flex p-12'>
      <Typography variant='h2'>Projects</Typography>
      <Button> Create Project </Button>
    </div>
  );
}
