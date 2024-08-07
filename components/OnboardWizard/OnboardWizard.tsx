'use client';

import { useEffect, useState } from 'react';
import { useOnboardWizard } from './OnboardWizardContext';
import type { Step } from './types';
import OnboardWizardPopover from './OnboardWizardPopover';
import Beacon from './Beacon';
import OnboardWizardModal from './OnboardWizardModal';

export default function OnboardWizard({
  steps,
  children,
  name,
}: {
  steps: Step[];
  children: React.ReactNode;
  name: string;
}) {
  const { currentStep, isOpen, currentWizard, beaconsVisible, showFlow } =
    useOnboardWizard();

  const [currentStepPosition, setCurrentStepPosition] = useState<{
    top: number;
    left: number;
    height: number;
    width: number;
  } | null>(null);
  const [beaconPositions, setBeaconPositions] = useState<
    Record<string, { top: number; left: number }>
  >({});
  const [previousElement, setPreviousElement] = useState<HTMLElement | null>(
    null,
  );

  const getTargetElement = (dataId: string): HTMLElement | null => {
    return document.querySelector(`[data-id="${dataId}"]`);
  };

  const getElementPosition = (element: HTMLElement) => {
    const { top, left, height, width } = element.getBoundingClientRect();
    return { top, left, height, width };
  };

  useEffect(() => {
    const updateStepPosition = () => {
      // Reset the prev element's z-index
      if (previousElement) {
        previousElement.style.zIndex = '';
      }

      if (isOpen && steps[currentStep] && name === currentWizard) {
        const { targetElementId } = steps[currentStep];
        const targetElement = targetElementId
          ? getTargetElement(targetElementId)
          : null;

        if (targetElement) {
          setCurrentStepPosition(getElementPosition(targetElement));
          targetElement.style.zIndex = '50';
          setPreviousElement(targetElement);
        } else {
          // If new step does not have a targetElementId, clear the current step position
          setCurrentStepPosition(null);
          setPreviousElement(null);
        }
      } else {
        // If the wizard is not open or there's no current step, clear the step position
        setCurrentStepPosition(null);
        setPreviousElement(null);
      }
    };

    updateStepPosition();
  }, [currentStep, steps, isOpen, previousElement, currentWizard, name]);

  // Handle window resize
  useEffect(() => {
    const updatePositions = () => {
      if (isOpen) {
        const currentStepPosition =
          currentStep !== null && steps[currentStep]?.targetElementId
            ? getElementPosition(
                getTargetElement(steps[currentStep].targetElementId)!,
              )
            : null;
        setCurrentStepPosition(currentStepPosition);
      }

      const newBeaconPositions: Record<string, { top: number; left: number }> =
        {};
      steps.forEach((step) => {
        const targetElement = getTargetElement(step.targetElementId ?? '');
        if (targetElement) {
          newBeaconPositions[step.id] = getElementPosition(targetElement);
        }
      });
      setBeaconPositions(newBeaconPositions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [currentStep, steps, isOpen]);

  if (currentWizard !== name && !beaconsVisible) {
    return <>{children}</>;
  }

  const showPopover = currentWizard === name && isOpen && currentStepPosition;
  const showModal = currentWizard === name && !currentStepPosition && isOpen;

  return (
    <>
      {children}
      {showPopover && (
        <>
          <div className="absolute inset-0 z-10 bg-cyber-grape-dark opacity-75" />
          <OnboardWizardPopover
            stepContent={steps[currentStep]?.content.en}
            elementPosition={currentStepPosition}
            totalSteps={steps.length}
            showFlow={showFlow}
          />
        </>
      )}
      {showModal && (
        <OnboardWizardModal
          stepContent={steps[currentStep]?.content.en}
          totalSteps={steps.length}
          showFlow={showFlow}
        />
      )}
      {beaconsVisible &&
        steps.map((step) =>
          beaconPositions[step.id] ? (
            <Beacon
              key={step.id}
              step={step}
              position={
                beaconPositions[step.id] as { top: number; left: number }
              }
              wizardName={name}
            />
          ) : null,
        )}
    </>
  );
}
