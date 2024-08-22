import { getStage, getStageCount } from '~/server/queries/stages';
import type { Interview } from '@prisma/client';
import type { IntRange } from 'type-fest';
import NameGenerator from '../interfaces/name-generator/NameGenerator';
import SimpleShell from './SimpleShell';

// This is the shell for the interview. It contains the navigation and the current stage shell.
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

  // eslint-disable-next-line no-console
  console.log('stage', stage, currentStage, interview.protocolRevisionId);

  const stageCount = await getStageCount({
    protocolRevisionId: interview.protocolRevisionId,
  });
  const progress = ((currentStage / stageCount) * 100) as IntRange<0, 100>;

  return (
    <SimpleShell isReadyForNextStage={isReadyForNextStage} progress={progress}>
      {stage?.type === 'NameGenerator' && <NameGenerator />}
    </SimpleShell>
  );
}
