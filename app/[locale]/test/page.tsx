import { getTodos } from '~/server/queries/todos';

import TodoForm from './_components/TodoForm';
import Todos from './_components/Todos';

export default async function Page() {
  const todos = await getTodos();

  return (
    <div>
      <h1 className="text-4xl">Responsive Form UX Test Page</h1>
      {/* <Todos initialTodos={todos} /> */}
      <TodoForm initialTodos={todos} />
    </div>
  );
}
