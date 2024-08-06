import { db } from '~/lib/db';

export const getStage = async ({
  stageId,
  protocolRevisionId,
}: {
  stageId: number;
  protocolRevisionId: number;
}) => {
  const stages = await db.stage.findMany({
    where: { protocolRevisionId },
  });

  return stages[stageId];
};

export const getStageCount = async ({
  protocolRevisionId,
}: {
  protocolRevisionId: number;
}) => {
  return await db.stage.count({
    where: { protocolRevisionId },
  });
};
