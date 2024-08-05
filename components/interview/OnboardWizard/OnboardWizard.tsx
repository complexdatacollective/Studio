'use client';

import { useEffect, useState } from 'react';
import { useOnboardWizard } from './OnboardWizardContext';
import type { Step } from './types';
import Popover from '~/components/ui/Popover';

export default function OnboardWizard({
  steps,
  children,
}: {
  steps: Step[];
  children: React.ReactNode;
}) {
  const { currentStep, setStep, closeWizard, startWizard, isOpen } =
    useOnboardWizard();
  const [elementPosition, setElementPosition] = useState({});

  const getTargetElement = (targetElementId: string) => {
    return document.getElementById(targetElementId)!;
  };

  const getTargetElementPosition = (element: Element) => {
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
        <Popover content={steps[currentStep]?.content.en}>
          <div
            style={{
              top: elementPosition.top,
              left: elementPosition.left,
              width: elementPosition.width,
              height: elementPosition.height,
            }}
            className="absolute z-50 border-2 border-mustard"
          />
        </Popover>
      )}
    </div>
  );
}
