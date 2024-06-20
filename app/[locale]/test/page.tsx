import { getTodos } from '~/server/queries/todos';

import TodoForm from './_components/TodoForm';
import Todos from './_components/Todos';
import DataContextProvider from './Provider';

export default function Page() {
  const todos = getTodos();
  return (
    <DataContextProvider dataPromise={todos}>
      <div className="flex flex-col gap-10">
        <TodoForm />
        <Todos />
      </div>
    </DataContextProvider>
  );
}
