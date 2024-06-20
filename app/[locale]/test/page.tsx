import { getTodos } from '~/server/queries/todos';

import TodoForm from './_components/TodoForm';
import Todos from './_components/Todos';
import DataContextProvider from './Provider';

export default async function Page() {
  const todos = await getTodos();
  return (
    <DataContextProvider data={todos}>
      <div className="flex flex-col gap-10">
        <TodoForm />
        <Todos />
      </div>
    </DataContextProvider>
  );
}
