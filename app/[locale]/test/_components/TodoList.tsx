'use client';

import type { Todo } from '@prisma/client';
import { todosAtom } from './TodoForm';
import { useAtom } from 'jotai';

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos] = useAtom(todosAtom);
  // eslint-disable-next-line no-console
  console.log('todos', todos);

  return (
    <div className="border border-primary">
      <div className="font-bold">Separately rendered list of todos</div>
      <ul className="space-y-2">
        {initialTodos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between">
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
