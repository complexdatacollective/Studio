'use client';

import { Button } from '~/components/ui/Button';
import {
  testAuthedAction,
  testAuthedActionWithRoles,
} from '~/server/actions/test';
import { useServerAction } from 'zsa-react';
import { Input } from '~/components/ui/form/Input';

export function TestAuthedActionButton() {
  return (
    <form action={testAuthedAction}>
      <Button type="submit">Test authed action</Button>
    </form>
  );
}

export function TestAdminActionButton() {
  const { execute, isSuccess, isError, isPending, error, data } =
    useServerAction(testAuthedActionWithRoles);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);

        await execute({
          publicStudyId: formData.get('publicStudyId') as string,
          roles: ['ADMIN'],
          formData,
        });

        form.reset();
      }}
    >
      <Input name="publicStudyId" label="Public study ID" />
      <Input
        name="otherFormData"
        label="Required other form data. Enter any text."
      />
      <div>This action requires publicStudyId nc and ADMIN role</div>
      <Button type="submit" disabled={isPending}>
        Test authed action with roles
      </Button>
      {isSuccess && (
        <div className="text-success">
          Success. Data: {JSON.stringify(data)}
        </div>
      )}
      {isError && (
        <div className="text-destructive">
          Denied. Error: {JSON.stringify(error)}
        </div>
      )}
    </form>
  );
}
