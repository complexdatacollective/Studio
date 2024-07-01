'use server';

import { z } from 'zod';
import { formData, zfd } from 'zod-form-data';
import {
  authedAction,
  authedActionWithRoles,
  authedActionWithRolesSchema,
} from '~/lib/authedAction';

const actionOutputSchema = z.object({
  data: z.object({}),
  error: z.string().optional(),
});

export const testAuthedAction = authedAction
  .createServerAction()
  .input(zfd.formData({}))
  .output(actionOutputSchema)
  .handler(({ ctx }) => {
    // ctx is session from authedAction
    return {
      data: { messageFromAction: 'Authed action ran', userId: ctx.userId },
      error: undefined,
    };
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
  .output(actionOutputSchema)
  .handler(({ input, ctx }) => {
    const otherFormData = input.formData.otherFormData;
    // ctx is studyUser from authedActionWithRoles
    const userId = ctx.userId;
    return {
      data: {
        messageFromAction: 'Authed action with roles ran',
        otherFormData,
        userId,
      },
      error: undefined,
    };
  });
