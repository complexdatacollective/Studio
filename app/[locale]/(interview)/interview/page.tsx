/* eslint-disable no-console */
'use client';
import Navigation from './_components/Navigation';
import { useState } from 'react';
import StageShell from './_components/StageShell';

export default function Page() {
  const [progress, setProgress] = useState(0);

  const moveBackward = () => {
    console.log('moveBackward');
    setProgress(progress - 1);
  };

  const moveForward = () => {
    console.log('moveForward');
    setProgress(progress + 1);
  };

  const isReadyForNextStage = false;

  return (
    <div className="flex h-screen">
      <div className="">
        <Navigation
          moveBackward={moveBackward}
          moveForward={moveForward}
          pulseNext={isReadyForNextStage}
          progress={progress}
        />
      </div>
      <div className="flex-1 overflow-hidden overflow-y-auto">
        <StageShell />
      </div>
    </div>
  );
}
