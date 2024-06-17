'use client';

import { useGlobalOptimisticValue } from '../useOptimisticUpdate';

type TodoAtom = {
  id: number;
  title: string;
  processing: boolean;
};

export default function Todos() {
  const data = useGlobalOptimisticValue({ key: 'todoStore' }) as TodoAtom[];

  return (
    <ul>
      {data.map((todo) => (
        <li
          key={todo.id}
          className={todo.processing ? 'opacity-50' : 'opacity-100'}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
