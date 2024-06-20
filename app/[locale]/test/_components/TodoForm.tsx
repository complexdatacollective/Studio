'use client';

import { createTodo } from '~/server/actions/todo';
import SubmitButton from './SubmitButton';
import { useRef } from 'react';
import type { Todo } from '@prisma/client';
import { useGlobalOptimistic } from '../useOptimisticUpdate';
import { useFormState } from 'react-dom';
import useZodForm from '~/lib/hooks/useZodForm';
import { todoSchema } from '~/lib/schemas/todoForm';

// Function to generate an ascending ID number for optimistic updates, taking
// into account the current number of todos.
let nextId = 0;
const generateUUID = (currentIds: number[]) => {
  while (currentIds.includes(nextId)) {
    nextId++;
  }
  return nextId;
};

export default function TodoForm({ initialTodos }: { initialTodos: Todo[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [, addOptimisticTodo] = useGlobalOptimistic<Todo[], Todo['title']>(
    initialTodos,
    (state, title) => [
      ...state,
      {
        id: generateUUID(state.map((todo) => todo.id)),
        title,
        processing: true,
      },
    ],
    'todoStore',
  );

  const [serverFormState, wrappedCreateTodo] = useFormState(createTodo, {
    title: '',
    errors: {
      message: undefined,
    },
  });

  const {
    register,
    formState: { errors, isValid },
  } = useZodForm({
    schema: todoSchema,
  });

  return (
    <div>
      <form
        ref={formRef}
        action={(formData: FormData) => {
          formRef.current?.reset();
          const todoTitle = formData.get('todoTitle') as string;
          addOptimisticTodo(todoTitle);
          wrappedCreateTodo(formData);
        }}
        className="flex flex-col space-y-4"
      >
        <input
          className="rounded-sm"
          type="text"
          id="title"
          placeholder="Todo title"
          {...register('todoTitle')}
        />
        {/* server validation error message */}
        {serverFormState.errors.message && (
          <div className="text-destructive">
            {serverFormState.errors.message}
          </div>
        )}
        {/* client validation error message */}
        {errors && (
          <div className="text-destructive">{JSON.stringify(errors)}</div>
        )}
        <SubmitButton />
        {isValid && <div className="text-success">Form is valid</div>}
      </form>
    </div>
  );
}
