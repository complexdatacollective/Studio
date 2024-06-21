import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const todoSchema = z.object({
  todoTitle: z
    .string()
    .trim()
    .min(1, { message: 'Title must be at least 1 character' }),
});

export const todoFormSchema = zfd.formData(todoSchema);
