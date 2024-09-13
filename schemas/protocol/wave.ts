import { z } from 'zod';

export const WaveSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export type Wave = z.infer<typeof WaveSchema>;
