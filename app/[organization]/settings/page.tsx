'use client';

import { useMutation, useQuery } from 'convex/react';
import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Members } from '~/components/Members';
import { OrgRoles } from '~/components/RoleDescriptions';
import { SettingsSection } from '~/components/SettingsSection';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useState } from 'react';

export default function OrganizationSettingsPage() {
  const params = useParams();
  const [newMemberEmail, setNewMemberEmail] = useState('');

  if (!params.organization || typeof params.organization !== 'string') {
    return null;
  }

  const members = useQuery(api.organizations.getMembers, {
    organizationSlug: params.organization,
  });

  const addMember = useMutation(api.organizations.addMember);

  if (!members) {
    return <div>Loading organization members...</div>;
  }

  return (
    <div className='p-12'>
      <Typography variant='h1'>Organization Settings Page</Typography>
      <div className='space-y-4'>
        <OrgRoles />
        <SettingsSection title='Add Organization Members'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void addMember({
                email: newMemberEmail,
                organizationSlug: params.organization as string,
              });
            }}
          >
            <div className='flex flex-row space-x-4'>
              <Input
                placeholder='Email address'
                className='mb-4'
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <Button type='submit'>Add Member</Button>
            </div>
          </form>
        </SettingsSection>
        <SettingsSection title='Organization Members'>
          <Members members={members} />
        </SettingsSection>
      </div>
    </div>
  );
}
