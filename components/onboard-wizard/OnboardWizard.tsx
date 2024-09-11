'use client';

import type { Wizard } from '~/lib/onboarding-wizard/store';
import { useOnboardWizard } from './useOnboardWizard';

export default function OnboardWizard({ wizard }: { wizard: Wizard }) {
  useOnboardWizard(wizard);

  return null;
}

// A HOC that wraps a stage with an onboarding wizard
export const withOnboardingWizard = (
  Component: React.ComponentType,
  wizard: Wizard,
) => {
  return (
    <>
      <OnboardWizard wizard={wizard} />
      <Component />
    </>
  );
};
