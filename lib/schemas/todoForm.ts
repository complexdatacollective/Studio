import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const todoSchema = z.object({
  title: z.string().min(1, 'Title must be at least 1 character'),
});

export const todoFormSchema = zfd.formData(todoSchema);
