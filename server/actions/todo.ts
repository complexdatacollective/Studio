'use server';

import { type Todo } from '@prisma/client';
import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';

export type CreateTodoFormState = {
  title: string;
  errors: {
    message: string | undefined;
  };
};

export async function createTodo(title: Todo['title']) {
  if (!title) {
    return {
      errors: {
        message: 'Must provide a title for the todo',
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
