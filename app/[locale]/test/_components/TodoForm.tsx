'use client';

import {
  type CreateTodoFormState,
  createTodo,
  deleteAllTodos,
} from '~/server/actions/todo';
import SubmitButton from '~/components/form/SubmitButton';
import { useOptimistic } from 'react';
import { useFormState } from 'react-dom';
import type { Todo } from '@prisma/client';
import useZodForm from '~/lib/hooks/useZodForm';
import { Button } from '~/components/ui/Button';
import { todoSchema } from '~/lib/schemas/todoForm';
import FormField from './FormField';

export default function TodoForm({ initialTodos }: { initialTodos: Todo[] }) {
  const {
    formState: { errors, isValid: isValidClient },
    handleSubmit,
  } = useZodForm({
    schema: todoSchema,
  });

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, newTodo: Todo) => {
      return [...state, newTodo];
    },
  );
  const [formState, wrappedCreateTodo] = useFormState(createTodo, {
    title: '',
    errors: {
      message: undefined,
    },
    success: false,
  } as CreateTodoFormState);

  const onSubmit = (formData: FormData) => {
    try {
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        title: formData.get('todoTitle') as string,
      };
      addOptimisticTodo(newTodo);
      wrappedCreateTodo(formData);
    } catch (error) {
      alert('Submitting form failed!');
    }
  };

  return (
    <div>
      <form
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        className="flex flex-col space-y-4"
      >
        <FormField
          type="text"
          placeholder="Todo title"
          defaultValue={formState.title}
          name="todoTitle"
          error={errors.todoTitle}
        />
        <span className="text-red-500">{errors.todoTitle?.message}</span>
        <SubmitButton disabled={!isValidClient}>Submit</SubmitButton>
      </form>

      <div>
        <Button onClick={() => deleteAllTodos()}>Delete all todos</Button>
        <ul className="space-y-2">
          {optimisticTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
