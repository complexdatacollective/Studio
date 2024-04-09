import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select';
import { CreateOrganization } from './CreateOrganization';
import { useQueryWithAuth } from '@convex-dev/convex-lucia-auth/react';
import { useQuery } from 'convex/react';
import { api } from '~/convex/_generated/api';
import { useRouter, useParams } from 'next/navigation';

export function OrganizationSwitcher() {
  const params = useParams();

  const user = useQueryWithAuth(api.users.get, {});
  if (!user) {
    return null;
  }

  const organizations = useQuery(api.organizations.get, {
    userId: user._id,
  });

  const router = useRouter();

  const selectOrg = (organizationName: string) => {
    router.push(`/${organizationName}`);
  };

  const selectedOrg: string = params.organization;

  return (
    // route to organization page on select
    <Select onValueChange={selectOrg} defaultValue={selectedOrg}>
      <SelectTrigger className='w-64'>
        <SelectValue placeholder='Select an Organization' />
      </SelectTrigger>
      <SelectContent>
        {organizations?.map((org) => (
          <SelectItem key={org._id} value={org.name}>
            {org.name}
          </SelectItem>
        ))}
        <CreateOrganization />
      </SelectContent>
    </Select>
  );
}
