import { useEffect, useMemo } from 'react';
import type { Wizard } from '~/lib/onboarding-wizard/store';
import { useWizardStore } from '~/lib/onboarding-wizard/useWizardStore';

// Returns scoped state for a given wizard
export const useOnboardWizard = (wizard: Wizard) => {
  const {
    activeWizardId,
    currentStep,
    addWizardToStore,
    removeWizard,
    nextStep,
    previousStep,
  } = useWizardStore();

  useEffect(() => {
    addWizardToStore(wizard);

    return () => removeWizard(wizard.id);
  }, [wizard, addWizardToStore, removeWizard]);

  const isActive = useMemo(
    () => activeWizardId === wizard.id,
    [activeWizardId, wizard.id],
  );

  const activeStep = useMemo(
    () => (isActive ? wizard.steps[currentStep!]! : null),
    [wizard.steps, isActive, currentStep],
  );

  return {
    isActive,
    activeStep,
    nextStep,
    previousStep,
  };
};
