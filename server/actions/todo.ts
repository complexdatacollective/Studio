'use server';

import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';

export type CreateTodoFormState = {
  title: string;
  errors: {
    message: string | undefined;
  };
};

export async function createTodo(_previousState: unknown, title: string) {
  if (!title) {
    return {
      title,
      errors: {
        message: 'Must provide a title for the todo',
      },
    };
  }

  // Simulate a delay to test optimistic UI
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await db.todo.create({
    data: {
      title,
    },
  });

  safeRevalidateTag('getTodos');

  return {
    title: '',
    errors: {
      message: undefined,
    },
  };
}
