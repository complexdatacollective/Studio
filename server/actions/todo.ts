'use server';

import { todoFormSchema } from '~/lib/schemas/todoForm';
import { safeRevalidateTag } from '~/lib/cache';
import { db } from '~/lib/db';

export type CreateTodoFormState = {
  title: string;
  errors: {
    message?: string | undefined;
  };
  success?: boolean;
};

export async function createTodo(
  previousState: CreateTodoFormState,
  formData: FormData,
) {
  const title = formData.get('todoTitle') as string;

  if (!title) {
    return {
      title,
      errors: {
        message: 'Must provide a title for the todo',
      },
      success: false,
    };
  }

  const parsedFormData = todoFormSchema.safeParse({
    todoTitle: title,
  });

  if (!parsedFormData.success) {
    return {
      title,
      errors: {
        ...parsedFormData.error.flatten(),
      },
      success: false,
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
    success: true,
  };
}

export async function deleteAllTodos() {
  await db.todo.deleteMany();

  safeRevalidateTag('getTodos');
}
