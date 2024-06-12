'use client';

import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/Card';
import { type CreateTodoFormState, createTodo } from '~/server/actions/todo';
import SubmitButton from './SubmitButton';
import { useOptimistic } from 'react';
import { useFormState } from 'react-dom';
import type { Todo } from '@prisma/client';

export default function ResponsiveForm({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => {
      return [...state, newTodo];
    },
  );
  const [formState, wrappedCreateTodo] = useFormState(createTodo, {
    title: '',
    errors: {
      message: undefined,
    },
  } as CreateTodoFormState);

  return (
    <div>
      <Card className="m-3 w-[28rem]">
        <CardHeader>
          <CardTitle>Create todo form</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={(formData) => {
              addOptimisticTodo({
                id: Math.random(),
                title: formData.get('todoTitle') as string,
              });
              wrappedCreateTodo(formData);
            }}
            className="flex flex-col space-y-4"
          >
            <input
              className="rounded-sm"
              type="text"
              id="todoTitle"
              name="todoTitle"
              placeholder="Todo title"
              defaultValue={formState.title}
            />
            {formState.errors.message && (
              <div className="text-destructive">{formState.errors.message}</div>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <div>
        <ul className="space-y-2">
          {optimisticTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
