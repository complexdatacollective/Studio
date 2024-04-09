import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select';
import { CreateOrganization } from './CreateOrganization';
import { useQueryWithAuth } from '~/hooks/useAuth';
import { useQuery } from 'convex/react';
import { api } from '~/convex/_generated/api';
import { useRouter, useParams } from 'next/navigation';

export function OrganizationSwitcher() {
  const params = useParams();

  const user = useQueryWithAuth(api.users.get, {});
  if (!user) {
    return null;
  }

  const organizations = useQuery(api.organizations.getAll, {
    userId: user._id,
  });

  const router = useRouter();

  // route to organization page on select
  const selectOrg = (organizationSlug: string) => {
    router.push(`/${organizationSlug}`);
  };

  if (!params.organization || typeof params.organization !== 'string') {
    return null;
  }

  const selectedOrg: string = params.organization;

  return (
    <Select onValueChange={selectOrg} defaultValue={selectedOrg}>
      <SelectTrigger className='w-64'>
        <SelectValue placeholder='Select an Organization' />
      </SelectTrigger>
      <SelectContent>
        {organizations?.map((org) => (
          <SelectItem key={org._id} value={org.slug}>
            {org.name}
          </SelectItem>
        ))}
        <CreateOrganization />
      </SelectContent>
    </Select>
  );
}
