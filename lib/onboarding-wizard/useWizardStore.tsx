import { useWizardContext } from './Provider';

export const useWizardStore = () => {
  const {
    registerWizard,
    deregisterWizard,
    activeWizardId,
    currentStep,
    nextStep,
    previousStep,
  } = useWizardContext((store) => store);

  return {
    activeWizardId,
    currentStep,
    nextStep,
    previousStep,
    addWizardToStore: registerWizard,
    removeWizard: deregisterWizard,
  };
};
