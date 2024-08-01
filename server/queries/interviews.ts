import { createCachedFunction } from '~/lib/cache';
import { db } from '~/lib/db';

export const getInterviewById = ({ interviewId }: { interviewId: string }) =>
  createCachedFunction(async () => {
    return await db.interview.findFirst({
      where: { publicId: interviewId },
      include: {
        protocolRevision: true,
      },
    });
  }, ['interview:getById', `interview:getById-${interviewId}`])();
