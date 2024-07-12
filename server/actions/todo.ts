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

export async function deleteTodo(id: number) {
  try {
    console.log('Deleting todo:', id);
    await db.todo.delete({
      where: {
        id,
      },
    });
    safeRevalidateTag('getTodos');
  } catch (error) {
    console.log('Failed to delete todo:', error);
    return {
      title: '',
      errors: {
        message: 'An error occurred while deleting the todo. Please try again.',
      },
    };
  }
}

export async function updateTodo(id: number, title: string) {
  try {
    await db.todo.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    safeRevalidateTag('getTodos');
  } catch (error) {
    console.log('Failed to update todo:', error);
    return {
      title: '',
      errors: {
        message: 'An error occurred while updating the todo. Please try again.',
      },
    };
  }
}
