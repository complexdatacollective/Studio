import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const OneToManyCensusSchema = z.object({
  type: StageTypeSchema.extract(['OneToManyCensus']),
});
