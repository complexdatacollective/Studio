'use client';

import {
  useGlobalOptimisticValue,
  useOptimisticValue,
} from '../useOptimisticUpdate';

export default function Todos({
  initialTodos,
}: {
  initialTodos: { id: number; title: string; processing: boolean }[];
}) {
  const data = useGlobalOptimisticValue('globalTodos');

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
