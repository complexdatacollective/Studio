'use client';

import { useEffect, useState } from 'react';
import { useOnboardWizard } from './OnboardWizardContext';
import type { Step } from './types';
import OnboardWizardPopover from './OnboardWizardPopover';
import Beacon from './Beacon';

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
    if (isOpen && steps[currentStep]) {
      const { targetElementId } = steps[currentStep];
      if (targetElementId) {
        const targetElement = getTargetElement(targetElementId);
        if (targetElement) {
          setCurrentStepPosition(getElementPosition(targetElement));
          targetElement.style.zIndex = '50';

          if (previousElement && previousElement !== targetElement) {
            previousElement.style.zIndex = '';
          }
          setPreviousElement(targetElement);
        }
      }
    } else {
      if (previousElement) {
        previousElement.style.zIndex = '';
      }
      setCurrentStepPosition(null);
      setPreviousElement(null);
    }
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
      {/* Render beacons if wizard is not running */}
      {!isOpen &&
        steps.map((step) => (
          <Beacon
            key={step.id}
            step={step}
            position={beaconPositions[step.id] ?? { top: 0, left: 0 }}
          />
        ))}
    </div>
  );
}
