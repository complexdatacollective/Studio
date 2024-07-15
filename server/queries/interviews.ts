import { createCachedFunction } from '~/lib/cache';
import { db } from '~/lib/db';

export const getInterviewById = ({ interviewId }: { interviewId: string }) =>
  createCachedFunction(async () => {
    const interview = await db.interview.findFirst({
      where: { publicId: interviewId },
      include: {
        protocolRevision: true,
      },
    });
    return interview;
  }, [`getInterview-${interviewId}`])();
