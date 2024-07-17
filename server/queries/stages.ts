import { db } from '~/lib/db';

export const getStage = async ({
  stageId,
  protocolRevisionId,
}: {
  stageId: number;
  protocolRevisionId: number;
}) => {
  return await db.stage.findFirst({
    where: { id: stageId, protocolRevisionId },
  });
};
