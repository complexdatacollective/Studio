'use client';

import { Button } from '~/components/ui/Button';
import { deleteTodo } from '~/server/actions/todo';
import { useDataContext } from '../Provider';
import { type Todo } from '@prisma/client';

export default function DeleteTodoButton({ id }: { id: number }) {
  const [, , deleteOptimisticItem] = useDataContext<Todo>();

  const handleDelete = async () => {
    try {
      // optimistic delete - removes from list
      deleteOptimisticItem(id);

      // delete the todo from the db
      await deleteTodo(id);
    } catch (error) {
      // rollback on error?
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
  );
}
