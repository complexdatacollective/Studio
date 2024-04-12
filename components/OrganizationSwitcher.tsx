import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select';
import { CreateOrganization } from './CreateOrganization';
import { api } from '~/convex/_generated/api';
import { useRouter, useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useQuery } from 'convex/react';

export function OrganizationSwitcher() {
  const params = useParams();
  const router = useRouter();

  const selectedOrg = useMemo(() => {
    return params && typeof params.organization === 'string'
      ? params.organization
      : '';
  }, [params.organization]);

  const organizations = useQuery(api.organizations.getAllUserOrgs, {});

  // route to organization page on select
  const selectOrg = (organizationSlug: string) => {
    router.push(`/${organizationSlug}`);
  };

  return (
    <Select onValueChange={selectOrg} value={selectedOrg}>
      <SelectTrigger className='w-64'>
        <SelectValue placeholder='Select an Organization' />
      </SelectTrigger>
      <SelectContent>
        {organizations?.map((org) => (
          <SelectItem key={org?._id} value={org?.slug!}>
            {org?.name}
          </SelectItem>
        ))}
        <CreateOrganization />
      </SelectContent>
    </Select>
  );
}
