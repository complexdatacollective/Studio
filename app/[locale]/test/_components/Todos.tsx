'use client';

import { type Todo } from '@prisma/client';
import { useDataContext } from '../Provider';

export default function Todos() {
  const { optimisticData } = useDataContext<Todo>();

  return (
    <ul>
      {optimisticData.map((todo) => (
        <li
          key={todo.id}
          className={
            'processing' in todo && todo.processing
              ? 'opacity-50'
              : 'opacity-100'
          }
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
