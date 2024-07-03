import { createCachedFunction } from '~/lib/cache';
import { db } from '~/lib/db';

export const getStages = ({
  protocolRevisionId,
}: {
  protocolRevisionId: number;
}) =>
  createCachedFunction(async () => {
    return await db.stage.findMany({
      where: { protocolRevisionId },
    });
  }, [`getStages-${protocolRevisionId}`])();

export const getStage = ({
  stageId,
  protocolRevisionId,
}: {
  stageId: number;
  protocolRevisionId: number;
}) =>
  createCachedFunction(async () => {
    return await db.stage.findFirst({
      where: { id: stageId, protocolRevisionId },
    });
  }, [`getStages`])();
