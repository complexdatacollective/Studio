'use server';

import { zfd } from 'zod-form-data';
import {
  authedAction,
  authedActionWithRoles,
  authedActionWithRolesSchema,
} from '~/lib/authedAction';

const schema = zfd.formData({
  // Add form data schema here
});

export const testAuthedAction = authedAction
  .createServerAction()
  .input(schema)
  .handler(() => {
    // eslint-disable-next-line no-console
    console.log('Authed action ran');
  });

export const testAuthedActionWithRoles = authedActionWithRoles
  .createServerAction()
  .input(authedActionWithRolesSchema)
  .handler(() => {
    // eslint-disable-next-line no-console
    console.log('Role-based auth action ran');
  });
