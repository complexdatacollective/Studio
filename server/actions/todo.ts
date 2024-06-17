'use server';

import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';

export type CreateTodoFormState = {
  title: string;
  errors: {
    message: string | undefined;
  };
};

export async function createTodo(_: unknown, formData: FormData) {
  const title = formData.get('todoTitle') as string;

  if (!title) {
    return {
      errors: {
        message: 'Server error: Must provide a title for the todo',
      },
    };
  }

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
