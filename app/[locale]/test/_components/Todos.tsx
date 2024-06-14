'use client';

export default function Todos({
  initialTodos,
}: {
  initialTodos: { id: number; title: string }[];
}) {
  return (
    <ul>
      {initialTodos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
