import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const SociogramSchema = z.object({
  type: StageTypeSchema.extract(['Sociogram']),
});
