'use client';

import { type Todo } from '@prisma/client';
import { useDataContext } from '../Provider';

export default function Todos() {
  const [todos] = useDataContext<Todo>();

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={todo.pending ? 'opacity-50' : 'opacity-100'}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
