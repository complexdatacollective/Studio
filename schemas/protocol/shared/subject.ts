import { z } from 'zod';

export const SubjectSchema = z.object({
  entity: z.enum(['node', 'edge']),
  id: z.string(),
});

export type TSubject = z.infer<typeof SubjectSchema>;
