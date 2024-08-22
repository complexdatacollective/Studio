import { useWizardContext } from './Provider';

export const useWizardStore = () => {
  const {
    registerWizard,
    deregisterWizard,
    activeWizard,
    currentStep,
    nextStep,
    previousStep,
  } = useWizardContext((store) => store);

  return {
    activeWizard,
    currentStep,
    nextStep,
    previousStep,
    addWizardToStore: registerWizard,
    removeWizard: deregisterWizard,
  };
};
