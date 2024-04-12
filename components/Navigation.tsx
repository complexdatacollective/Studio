import { OrganizationSwitcher, useOrganization } from '@clerk/nextjs';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function Navigation() {
  const params = useParams();

  return (
    <div className='flex flex-row items-center justify-between space-x-2 pl-4'>
      <OrganizationSwitcher
        afterSelectOrganizationUrl='/:slug'
        afterSelectPersonalUrl='/'
      />

      {params.project ? (
        <Link href={`/${params.organization}/${params.project}`}>
          <Button variant='ghost'>{params.project}</Button>
        </Link>
      ) : (
        <Link href={`/${params.organization}`}>
          <Button variant='ghost'>Projects</Button>
        </Link>
      )}
      {params.project && (
        <Link href={`/${params.organization}/${params.project}/settings`}>
          <Button variant='ghost'>Settings</Button>
        </Link>
      )}
    </div>
  );
}
