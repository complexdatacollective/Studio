import type { Todo } from '@prisma/client';
import { Button } from '~/components/ui/Button';
import { updateTodo } from '~/server/actions/todo';
import { useDataContext } from '../Provider';

export default function EditTodo({ id }: { id: number }) {
  const [, , , updateOptimisticItem] = useDataContext<Todo>();

  const handleEdit = async () => {
    const newTitle = prompt('Enter new title');
    if (!newTitle) {
      return;
    }

    try {
      // optimistic update - updates the title
      updateOptimisticItem({ id, title: newTitle });
      await updateTodo(id, newTitle);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };
  return (
    <Button variant="outline" onClick={handleEdit}>
      Edit
    </Button>
  );
}
