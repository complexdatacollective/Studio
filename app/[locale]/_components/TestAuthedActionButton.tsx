'use client';

import { Button } from '~/components/ui/Button';
import {
  testAuthedAction,
  testAuthedActionWithRoles,
} from '~/server/actions/test';
import { useServerAction } from 'zsa-react';
import { Input } from '~/components/ui/form/Input';

/*
Demonstration of a button that triggers an action that requires basic authentication.
Only the user's session is required.
No specific roles are required.
*/
export function TestAuthedActionButton() {
  const { executeFormAction, isError, isSuccess, data } =
    useServerAction(testAuthedAction);
  return (
    <form action={executeFormAction}>
      <Button type="submit">Test authed action</Button>
      {isSuccess && (
        <div className="text-success">Success: {JSON.stringify(data)}</div>
      )}
      {isError && <div className="text-destructive">Denied</div>}
    </form>
  );
}

/*
Demonstration of more complex role-based authorization.
Requires publicStudyId nc and the ADMIN role.
Demonstrates passing additional form data.
Demonstrates using useServerAction's props for execution, statuses, and data.
*/

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
