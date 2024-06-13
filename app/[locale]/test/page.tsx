import { getTodos } from '~/server/queries/todos';

import TodoForm from './_components/TodoForm';
import TodoList from './_components/TodoList';
import { Provider } from 'jotai';

export default async function Page() {
  const todos = await getTodos();

  return (
    <div>
      <Provider>
        <h1 className="text-4xl">Responsive Form UX Test Page</h1>
        <TodoForm initialTodos={todos} />
        <TodoList initialTodos={todos} />
      </Provider>
    </div>
  );
}
