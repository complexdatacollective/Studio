'use client';

import type { Todo } from '@prisma/client';
import { useGlobalOptimisticValue } from '../useOptimisticUpdate';

type TodoAtom = {
  id: number;
  title: string;
  processing: boolean;
};

export default function Todos({ initialTodos }: { initialTodos: Todo[] }) {
  const data = useGlobalOptimisticValue({ key: 'todoStore' }) as TodoAtom[];

  return (
    <ul>
      {(data && data.length > 0 ? data : initialTodos).map((todo) => (
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
