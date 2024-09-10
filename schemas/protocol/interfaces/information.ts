import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const InformationSchema = z.object({
  type: StageTypeSchema.extract(['Information']),
});
