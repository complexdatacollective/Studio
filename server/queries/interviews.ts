import { createCachedFunction } from '~/lib/cache';
import createAction from '~/lib/createAction';
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

export const getInterviews = createAction()
  .requireAuthContext()
  .handler(async () => {
    return await db.interview.findMany();
  });
