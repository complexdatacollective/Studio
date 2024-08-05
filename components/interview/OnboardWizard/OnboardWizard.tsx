'use client';

import { useEffect, useState } from 'react';
import { useOnboardWizard } from './OnboardWizardContext';
import type { Step } from './types';
import OnboardWizardPopover from './OnboardWizardPopover';

export default function OnboardWizard({
  steps,
  children,
}: {
  steps: Step[];
  children: React.ReactNode;
}) {
  const { currentStep, isOpen } = useOnboardWizard();
  const [elementPosition, setElementPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const getTargetElement = (dataId: string): HTMLElement | null => {
    return document.querySelector(`[data-id="${dataId}"]`);
  };

  const getTargetElementPosition = (element: HTMLElement) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    return { top, left, width, height };
  };

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const { targetElementId } = steps[currentStep];
      if (targetElementId) {
        const targetElement = getTargetElement(targetElementId);
        if (targetElement) {
          setElementPosition(getTargetElementPosition(targetElement));
          targetElement.style.zIndex = '50';
        }
      }
    } else {
      setElementPosition(null);
    }
  }, [currentStep, steps, isOpen]);

  return (
    <div className="text-black">
      {children}
      {elementPosition && isOpen && (
        <>
          <div className="absolute inset-0 z-10 bg-cyber-grape-dark opacity-75" />
          <OnboardWizardPopover
            stepContent={steps[currentStep]?.content.en}
            elementPosition={elementPosition}
            totalSteps={steps.length}
          />
        </>
      )}
    </div>
  );
}
