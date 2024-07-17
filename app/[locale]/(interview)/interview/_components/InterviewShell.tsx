/* eslint-disable no-console */
import Navigation from './Navigation';
import StageShell from './StageShell';
import type { Interview } from '@prisma/client';

// This is the shell for the interview. It contains the navigation and the current stage shell.
export default function InterviewShell({
  interview,
  currentStage,
}: {
  interview: Interview;
  currentStage: number;
}) {
  const isReadyForNextStage = false;
  const progress = 0;
  console.log(interview);

  return (
    <div className="flex h-screen bg-navy-taupe text-white">
      <div className="">
        <Navigation pulseNext={isReadyForNextStage} progress={progress} />
      </div>
      <div className="flex-1 overflow-hidden overflow-y-auto">
        <StageShell
          stageId={currentStage}
          protocolRevisionId={interview.protocolRevisionId}
        />
      </div>
    </div>
  );
}
