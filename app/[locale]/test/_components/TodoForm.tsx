'use client';

import { createTodo } from '~/server/actions/todo';
import SubmitButton from './SubmitButton';
import { useOptimistic } from 'react';
import type { Todo } from '@prisma/client';

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
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    Todo[],
    Todo['title']
  >(initialTodos, (state, title) => [
    ...state,
    { id: generateUUID(state.map((todo) => todo.id)), title },
  ]);

  return (
    <div>
      <div>
        <form
          action={async (formData: FormData) => {
            const todoTitle = formData.get('todoTitle') as string;
            addOptimisticTodo(todoTitle);
            await createTodo(undefined, todoTitle);
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
          <SubmitButton />
        </form>
      </div>
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
