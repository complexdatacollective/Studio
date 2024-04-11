'use client';

import { useQuery } from 'convex/react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Members } from '~/components/Members';
import { ProjectRoles } from '~/components/RoleDescriptions';
import { SettingsSection } from '~/components/SettingsSection';

export default function ProjectSettingsPage() {
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
      <Typography variant='h1'>Project Settings Page</Typography>
      <div className='space-y-4'>
        <ProjectRoles />

        <SettingsSection title='Project Members'>
          <Members members={members} />
        </SettingsSection>
      </div>
    </div>
  );
}
