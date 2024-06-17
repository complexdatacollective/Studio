'use client';

import { type CreateTodoFormState, createTodo } from '~/server/actions/todo';
import SubmitButton from './SubmitButton';
import { useRef } from 'react';
import type { Todo } from '@prisma/client';
import { useGlobalOptimistic } from '../useOptimisticUpdate';
import { useFormState } from 'react-dom';
import { create } from 'domain';

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

  const [formState, wrappedCreateTodo] = useFormState(createTodo, {
    title: '',
    errors: {
      message: undefined,
    },
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
          id="todoTitle"
          name="todoTitle"
          placeholder="Todo title"
        />
        {formState.errors.message && (
          <div className="text-destructive">{formState.errors.message}</div>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
