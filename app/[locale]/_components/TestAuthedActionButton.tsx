'use client';

import { useFormState } from 'react-dom';
import { Button } from '~/components/ui/Button';
import {
  myAuthedAction,
  myRolesBasedAuthedAction,
} from '~/server/actions/test';

/*
Demonstration of a button that triggers an action that requires basic authentication.
Only the user's session is required.
No specific roles are required.
*/
export function TestAuthedActionButton() {
  const [formState, formAction] = useFormState(myAuthedAction, {
    data: null,
    error: null,
  });
  return (
    <form action={formAction}>
      <Button type="submit">Test authed action</Button>
      {formState.data && (
        <div className="text-success">
          Success: {JSON.stringify(formState.data)}
        </div>
      )}
      {formState.error && <div className="text-destructive">Denied</div>}
    </form>
  );
}

/*
Demonstration of more complex role-based authorization.
Requires publicStudyId nc and the ADMIN role.
Demonstrates passing additional form data.
*/

export function TestAdminActionButton() {
  const [formState, formAction] = useFormState(myRolesBasedAuthedAction, {
    data: null,
    error: null,
  });
  return (
    <form action={formAction}>
      <Button type="submit">Test authed action with roles</Button>
      {formState.data && (
        <div className="text-success">
          Success. {JSON.stringify(formState.data)}
        </div>
      )}
      {formState.error && (
        <div className="text-destructive">
          Denied. Error: {JSON.stringify(formState.error)}
        </div>
      )}
    </form>
  );
}
