import { getStage } from '~/server/queries/stages';
import Navigation from './Navigation';
import StageShell from './StageShell';
import type { Interview } from '@prisma/client';

// This is the shell for the interview. It contains the navigation and the current stage shell.
export default async function InterviewShell({
  interview,
  currentStage,
}: {
  interview: Interview;
  currentStage: number;
}) {
  const isReadyForNextStage = false;
  const progress = 0;
  const stage = await getStage({
    stageId: currentStage,
    protocolRevisionId: interview.protocolRevisionId,
  });

  return (
    <div className="flex h-screen bg-navy-taupe text-white">
      <div className="">
        <Navigation pulseNext={isReadyForNextStage} progress={progress} />
      </div>
      <div className="flex-1 overflow-hidden overflow-y-auto">
        {stage ? <StageShell stage={stage} /> : <div>Stage not found</div>}
      </div>
    </div>
  );
}
