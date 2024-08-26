import { useWizardContext } from './Provider';

export const useWizardStore = () => {
  const {
    registerWizard,
    deregisterWizard,
    activeWizardName: activeWizard,
    currentStep,
    nextStep,
    previousStep,
    showBeacons,
  } = useWizardContext((store) => store);

  return {
    activeWizard,
    currentStep,
    nextStep,
    previousStep,
    addWizardToStore: registerWizard,
    removeWizard: deregisterWizard,
    showBeacons,
  };
};
