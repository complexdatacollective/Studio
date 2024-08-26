import { useEffect, useMemo } from 'react';
import { type Step } from '~/lib/onboarding-wizard/store';
import { useWizardStore } from '~/lib/onboarding-wizard/useWizardStore';

// Returns scoped state for a given wizard
export const useOnboardWizard = ({
  name,
  steps,
  priority,
}: {
  name: string;
  steps: Step[];
  priority: number;
}) => {
  // Get global store
  const {
    activeWizard,
    currentStep,
    addWizardToStore,
    removeWizard,
    nextStep,
    previousStep,
    showBeacons,
  } = useWizardStore();

  // On mount, register the wizard with the store
  useEffect(() => {
    addWizardToStore({ name, steps, priority });

    return () => removeWizard(name);
  }, [name, steps, priority, addWizardToStore, removeWizard]);

  const isActive = useMemo(() => activeWizard === name, [activeWizard, name]);

  const activeStep = useMemo(
    () => (isActive ? steps[currentStep!]! : null),
    [steps, isActive, currentStep],
  );

  return {
    isActive,
    activeStep,
    nextStep,
    previousStep,
    showBeacons,
  };
};
