'use server';

import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';
import { todoFormSchema } from '~/lib/schemas/todoForm';

export type CreateTodoFormState = {
  title: string;
  errors: {
    message: string | undefined;
  };
};

export async function createTodo(_: unknown, formData: FormData) {
  const title = formData.get('todoTitle') as string;

  const parsedFormData = todoFormSchema.safeParse({
    todoTitle: title,
  });

  if (!parsedFormData.success) {
    return {
      title: '',
      errors: {
        message: 'Invalid form submission.',
      },
    };
  }

  try {
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
  } catch (error) {
    return {
      title: '',
      errors: {
        message: 'An error occurred while creating the todo. Please try again.',
      },
    };
  }
}
