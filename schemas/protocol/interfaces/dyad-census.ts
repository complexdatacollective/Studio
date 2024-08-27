import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const DyadCensusSchema = z.object({
  type: StageTypeSchema.extract(['DyadCensus']),
});
