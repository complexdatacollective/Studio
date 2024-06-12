'use server';

import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';
import { organizations } from '~/lib/db/schema';
import { generatePublicId } from '~/lib/generatePublicId';

export type CreateOrganizationFormState = {
  name: string;
  errors: {
    message: string | undefined;
  };
};
export async function createOrganization(
  previousState: CreateOrganizationFormState,
  formData: FormData,
) {
  const name = formData.get('orgName') as string;

  if (!name) {
    return {
      name,
      errors: {
        message: 'Must provide an org name',
      },
    };
  }

  // Simulate a delay to test optimistic UI
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await db.insert(organizations).values({
    name,
    public_id: generatePublicId(),
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  });

  safeRevalidateTag('getOrganizations');

  return {
    name: '',
    errors: {
      message: undefined,
    },
  };
}
