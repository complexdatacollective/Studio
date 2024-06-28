'use server';

import { formData, zfd } from 'zod-form-data';
import {
  authedAction,
  authedActionWithRoles,
  authedActionWithRolesSchema,
} from '~/lib/authedAction';

export const testAuthedAction = authedAction
  .createServerAction()
  .input(zfd.formData({}))
  .handler(({ ctx }) => {
    // ctx is session from authedAction
    return { messageFromAction: 'Authed action ran', userId: ctx.userId };
  });

// example of extending authedActionWithRolesSchema to add additional form data
const testAuthedActionWithRolesSchema = authedActionWithRolesSchema.extend({
  formData: formData({
    otherFormData: zfd.text(),
  }),
});

export const testAuthedActionWithRoles = authedActionWithRoles
  .createServerAction()
  .input(testAuthedActionWithRolesSchema)
  .handler(({ input, ctx }) => {
    const otherFormData = input.formData.otherFormData;
    // ctx is studyUser from authedActionWithRoles
    const userId = ctx.userId;
    return {
      messageFromAction: 'Authed action with roles ran',
      otherFormData,
      userId,
    };
  });
