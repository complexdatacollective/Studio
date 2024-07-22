'use server';
import { createServerActionProcedure } from 'zsa';

const authedProcedure = createServerActionProcedure().handler(async () => {
  try {
    const { email, id } = await getUser();

    return {
      user: {
        email,
        id,
      },
    };
  } catch {
    throw new Error('User not authenticated');
  }
});

export const updateEmail = authedProcedure
  .createServerAction()
  .input(
    z.object({
      newEmail: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    const { user } = ctx;

    // Update user's email in the database
    await db
      .update(users)
      .set({
        email: newEmail,
      })
      .where(eq(users.id, user.id));

    return input.newEmail;
  });
