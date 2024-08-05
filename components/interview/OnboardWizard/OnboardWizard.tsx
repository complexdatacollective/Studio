'use client';

import { useEffect } from 'react';
import { useOnboardWizard } from './OnboardWizardContext';
import type { Step } from './types';

export default function OnboardWizard({
  steps,
  children,
}: {
  steps: Step[];
  children: React.ReactNode;
}) {
  const { currentStep, setStep, closeWizard, startWizard, isOpen } =
    useOnboardWizard();

  const getTargetElement = (targetElementId: string) => {
    return document.getElementById(targetElementId)!;
  };

  // Add a border around the target element if the wizard is open
  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const { targetElementId } = steps[currentStep];
      if (targetElementId) {
        const targetElement = getTargetElement(targetElementId as string);
        if (targetElement) {
          targetElement.classList.add('border', 'border-mustard');
          return () => {
            targetElement.classList.remove('border', 'border-mustard');
          };
        }
      }
    }
  }, [currentStep, steps, isOpen]);

  return <div>{children}</div>;
}
