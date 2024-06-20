import { getTodos } from '~/server/queries/todos';

import TodoForm from './_components/TodoForm';
import Todos from './_components/Todos';
import CreateDataContext from './SharedDataContext';

export default function Page() {
  return (
    <CreateDataContext query={getTodos}>
      <div className="flex flex-col gap-10">
        <TodoForm />
        <Todos />
      </div>
    </CreateDataContext>
  );
}
