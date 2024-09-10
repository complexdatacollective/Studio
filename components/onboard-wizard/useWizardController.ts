import { useCallback } from 'react';
import { useWizardContext } from '~/lib/onboarding-wizard/Provider';

export const useWizardController = () => {
  const {
    setActiveWizard,
    nextStep,
    hasNextStep,
    previousStep,
    hasPreviousStep,
    progress,
    wizards,
  } = useWizardContext();

  const closeWizard = useCallback(
    () => setActiveWizard(null),
    [setActiveWizard],
  );

  return {
    setActiveWizard,
    wizards,
    closeWizard,
    nextStep,
    hasNextStep: hasNextStep(),
    previousStep,
    hasPreviousStep: hasPreviousStep(),
    progress,
  };
};
