import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const NameGeneratorSchema = z.object({
  type: StageTypeSchema.extract(['NameGenerator']),
});
