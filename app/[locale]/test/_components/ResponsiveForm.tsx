'use client';

import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/Card';
import {
  type CreateOrganizationFormState,
  createOrganization,
} from '~/server/actions/organizations';
import SubmitButton from './SubmitButton';
import { type PublicOrganization } from '~/lib/db/schema';
import { useOptimistic } from 'react';
import { useFormState } from 'react-dom';

export default function ResponsiveForm({
  orgs,
}: {
  orgs: PublicOrganization[];
}) {
  const [optimisticOrgs, addOptimisticOrg] = useOptimistic(
    orgs,
    (state, newOrg: PublicOrganization) => {
      return [...state, newOrg];
    },
  );
  const [formState, wrappedCreateOrganization] = useFormState(
    createOrganization,
    {
      name: '',
      errors: {
        message: undefined,
      },
    } as CreateOrganizationFormState,
  );

  return (
    <div>
      <Card className="m-3 w-[28rem]">
        <CardHeader>
          <CardTitle>Create organization form</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={(formData) => {
              addOptimisticOrg({
                public_id: Math.random().toString(),
                slug: formData.get('orgName') as string,
                name: formData.get('orgName') as string,
              });
              wrappedCreateOrganization(formData);
            }}
            className="flex flex-col space-y-4"
          >
            <input
              className="rounded-sm"
              type="text"
              id="orgName"
              name="orgName"
              placeholder="Org name"
              defaultValue={formState.name}
            />
            {formState.errors.message && (
              <div className="text-destructive">{formState.errors.message}</div>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <div>
        <ul className="space-y-2">
          {optimisticOrgs.map((org) => (
            <li
              key={org.public_id}
              className="flex items-center justify-between"
            >
              <span>{org.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
