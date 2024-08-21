'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { useRegisterWizard } from './OnboardWizardContext';
import OnboardWizardPopover from './OnboardWizardPopover';
import Beacon from './Beacon';
import OnboardWizardModal from './OnboardWizardModal';
import type { Step } from './types';
import { getElementPosition, getTargetElement } from '~/lib/onboardWizardUtils';

// These should be in a helpers/utils file

const PopoverBackdrop = () => (
  <div className="absolute inset-0 z-10 backdrop-blur-sm backdrop-brightness-75" />
);

export default function OnboardWizard({
  steps,
  children,
  name,
  priority,
}: {
  steps: Step[];
  children: React.ReactNode;
  name: string;
  priority?: number;
}) {
  const {
    currentStep, // Automatically localised by provider.
    isActive, // Controlled by provider.
    showFlow, // Controlled by provider.
    activateWizard, // (stepId: number) => void
    progress, // progress through current wizard
  } = useRegisterWizard({
    name, // Index for use in store
    steps,
    priority,
  });

  console.log(name, currentStep, isActive, showFlow, progress);

  // Abstract beacon logic into a hook, which returns:
  type Beacon = {
    id: number;
    stepIndex: number; // Index of the step in the wizard
    position: { top: number; left: number };
  };

  // Custom hook!
  // const beacons: Beacon[] = generateBeacons(steps);

  // activateWizard(0);

  return (
    <>
      {children}
      {isActive && (
        <>
          <PopoverBackdrop />
          {/* 

            Simplify the api here!

            New component, WizardStep should internally handle modal and 
            positioned variants. Total steps, and element position should be
            calculated inside the component, not passed as props.
          */}
          <WizardStep step={currentStep} />
        </>
      )}
      {showFlow &&
        beacons.map((beacon) =>
          // <Beacon
          //   key={beacon.id}
          //   position={beacon.position}
          //   onClick={() => activateWizard(beacon.stepIndex)}
          // />
          console.log('beacon'),
        )}
      <button onClick={() => activateWizard(0)}>Activate Wizard {name}</button>
    </>
  );
}

const WizardStep = ({ step }: { step: Step }) => {
  const { targetElementId, content } = step;
  const [position, setPosition] = useState();

  useEffect(() => {
    const updatePosition = () => {
      if (!targetElementId) {
        return;
      }
      const element = getTargetElement(targetElementId);
      if (!element) {
        return;
      }
      const newPosition = getElementPosition(element);
      if (!newPosition) {
        return;
      }
      setPosition(newPosition);
    };

    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [targetElementId]);

  return targetElementId ? (
    <OnboardWizardPopover position={position} content={content} />
  ) : (
    <OnboardWizardModal content={content} />
  );
};
