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
  const { execute } = useServerAction(testAuthedActionWithRoles);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);
        const [data, err] = await execute({
          publicStudyId: 'abcd',
          roles: ['ADMIN'],
        });

        if (err) {
          // handle error
          return;
        }

        form.reset();
      }}
    >
      <Button type="submit">Test authed action with roles</Button>
    </form>
  );
}
