'use client';

import WizardStep from './WizardStep';
import type { Wizard } from '~/lib/onboarding-wizard/store';
import { useOnboardWizard } from './useOnboardWizard';

export default function OnboardWizard({
  children,
  wizard,
}: {
  children: React.ReactNode;
  wizard: Wizard;
}) {
  const { isActive, activeStep } = useOnboardWizard(wizard);

  return (
    <>
      {children}
      {isActive && activeStep && <WizardStep step={activeStep} />}
    </>
  );
}
