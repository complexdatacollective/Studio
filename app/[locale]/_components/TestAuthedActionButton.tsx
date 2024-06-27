'use client';

import { Button } from '~/components/ui/Button';
import {
  testAuthedAction,
  testAuthedActionWithRoles,
} from '~/server/actions/test';
import { useServerAction } from 'zsa-react';

export function TestAuthedActionButton() {
  return (
    <form action={testAuthedAction}>
      <Button type="submit">Test authed action</Button>
    </form>
  );
}

export function TestAdminActionButton() {
  const { execute, isSuccess, isError } = useServerAction(
    testAuthedActionWithRoles,
  );

  if (isSuccess) {
    console.log('Success!');
  }

  if (isError) {
    console.log('Error!');
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);
        await execute({
          publicStudyId: 'nc',
          roles: ['ADMIN'],
        });

        form.reset();
      }}
    >
      <Button type="submit">Test authed action with roles</Button>
    </form>
  );
}
