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

export function OrganizationSwitcher() {
  const user = useQueryWithAuth(api.users.get, {});
  if (!user) {
    return null;
  }

  const organizations = useQuery(api.organizations.get, {
    userId: user._id,
  });

  return (
    <Select>
      <SelectTrigger className='w-64'>
        <SelectValue placeholder='Select Organization' />
      </SelectTrigger>
      <SelectContent>
        {organizations?.map((org) => (
          <SelectItem key={org._id} value={org._id}>
            {org.name}
          </SelectItem>
        ))}
        <CreateOrganization />
      </SelectContent>
    </Select>
  );
}
