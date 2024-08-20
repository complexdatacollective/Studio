import { z } from 'zod';

export const SubjectSchema = z.object({
  entity: z.object({
    id: z.string(),
    type: z.string(),
  }),
  type: z.string(),
});

export type TSubject = z.infer<typeof SubjectSchema>;
