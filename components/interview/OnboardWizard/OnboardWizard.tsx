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
}: {
  steps: Step[];
  children: React.ReactNode;
}) {
  const { currentStep, isOpen } = useOnboardWizard();
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

      if (isOpen && steps[currentStep]) {
        const { targetElementId } = steps[currentStep];
        if (targetElementId) {
          const targetElement = getTargetElement(targetElementId);
          if (targetElement) {
            setCurrentStepPosition(getElementPosition(targetElement));
            targetElement.style.zIndex = '50';
            setPreviousElement(targetElement);
          }
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
  }, [currentStep, steps, isOpen, previousElement]);

  // Handle window resize
  useEffect(() => {
    const updatePositions = () => {
      if (isOpen) {
        const newCurrentStepPosition =
          currentStep !== null && steps[currentStep]?.targetElementId
            ? getElementPosition(
                getTargetElement(steps[currentStep].targetElementId)!,
              )
            : null;
        setCurrentStepPosition(newCurrentStepPosition);
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

  return (
    <div>
      {children}
      {currentStepPosition && isOpen && (
        <>
          <div className="absolute inset-0 z-10 bg-cyber-grape-dark opacity-75" />
          <OnboardWizardPopover
            stepContent={steps[currentStep]?.content.en}
            elementPosition={currentStepPosition}
            totalSteps={steps.length}
          />
        </>
      )}
      {/* Render Modal if there is no target element id */}
      {isOpen && !currentStepPosition && (
        <>
          <OnboardWizardModal
            stepContent={steps[currentStep]?.content.en}
            totalSteps={steps.length}
          />
        </>
      )}
      {/* Render beacons if wizard is not running */}
      {!isOpen &&
        steps.map(
          (step) =>
            // only render beacon if there is a target element
            beaconPositions[step.id] && (
              <Beacon
                key={step.id}
                step={step}
                position={
                  beaconPositions[step.id] as { top: number; left: number }
                }
              />
            ),
        )}
    </div>
  );
}
