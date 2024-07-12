'use client';

import { type Todo } from '@prisma/client';
import { useDataContext } from '../Provider';
import DeleteTodoButton from './DeleteTodoButton';
import EditTodo from './EditTodo';

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
          <DeleteTodoButton id={todo.id} />
          <EditTodo id={todo.id} />
        </li>
      ))}
    </ul>
  );
}
