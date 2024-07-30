import { getStage, getStageCount } from '~/server/queries/stages';
import Navigation from './Navigation';
import StageShell from './StageShell';
import type { Interview } from '@prisma/client';
import { Onborda } from 'onborda';
import { getSteps } from '~/lib/onborda/steps';
import card from '~/lib/onborda/card';

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

  const stageCount = await getStageCount({
    protocolRevisionId: interview.protocolRevisionId,
  });
  const progress = (currentStage / stageCount) * 100;

  return (
    <Onborda
      steps={stage ? getSteps(stage.type) : []}
      cardComponent={card}
      shadowOpacity="0.6"
    >
      <div className="flex h-screen bg-navy-taupe text-white">
        <Navigation pulseNext={isReadyForNextStage} progress={progress} />

        <div className="flex-1 overflow-hidden overflow-y-auto">
          {stage ? <StageShell stage={stage} /> : <div>Stage not found</div>}
        </div>
      </div>
    </Onborda>
  );
}
