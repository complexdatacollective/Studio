import { getStage, getStageCount } from '~/server/queries/stages';
import type { Interview } from '@prisma/client';
import type { IntRange } from 'type-fest';
import NameGenerator from '../interfaces/name-generator/NameGenerator';
import SimpleShell from './SimpleShell';
import { getAvailableLocales } from '~/lib/localisation/locale';
import { getCurrentPath, getInterviewId } from '~/lib/serverUtils';

// TODO: This is a placeholder for after the schema work is done.
export type InterviewStage = {
  configuration?: Record<string, unknown>;
};

export default async function InterviewShell({
  interview,
  currentStage,
}: {
  interview: Interview;
  currentStage: number;
}) {
  const isReadyForNextStage = false;

  const stage = await getStage({
    stageId: currentStage,
    protocolRevisionId: interview.protocolRevisionId,
  });

  const stageCount = await getStageCount({
    protocolRevisionId: interview.protocolRevisionId,
  });
  const progress = ((currentStage / stageCount) * 100) as IntRange<0, 100>;

  const currentPath = getCurrentPath();
  const interviewId = getInterviewId(currentPath);
  const availableLocales = await getAvailableLocales('INTERVIEW', interviewId);
  return (
    <SimpleShell
      isReadyForNextStage={isReadyForNextStage}
      progress={progress}
      availableLocales={availableLocales}
    >
      {stage?.type === 'NameGenerator' && <NameGenerator />}
    </SimpleShell>
  );
}
