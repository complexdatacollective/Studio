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
  const user = useQueryWithAuth(api.users.get, {});
  if (!user) {
    return null;
  }

  const organizations = useQuery(api.organizations.get, {
    userId: user._id,
  });

  const router = useRouter();

  const selectOrg = (organizationId: string) => {
    router.push(`/${organizationId}`);
  };

  const params = useParams();
  const placeholderText = params.organization
    ? params.organization
    : 'Select an Organization';

  return (
    // route to organization page on select
    <Select onValueChange={selectOrg}>
      <SelectTrigger className='w-64'>
        <SelectValue placeholder={placeholderText} />
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
