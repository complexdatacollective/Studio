import { useEffect } from 'react';
import { useWizardContext } from './Provider';
import type { Step } from './store';
import { useStore } from 'zustand';

type UseRegisterWizardProps = {
  name: string;
  steps: Step[];
  priority: number;
};

export const useRegisterWizard = ({
  name,
  steps,
  priority,
}: UseRegisterWizardProps) => {
  const { wizards, actions } = useWizardContext();

  // useEffect(() => {
  //   actions.registerWizard({ name, steps, priority });
  // }, [name, steps, priority, actions]);

  const wizard = wizards.find((w) => w.name === name);

  // Determine if the wizard is active based on whether it has been seen
  const isActive = wizard?.isActive;
  // const currentStep = isActive ? wizard?.steps[wizard.currentStep] : null;
  const currentStep = 0;

  return {
    isActive: isActive ?? false,
    currentStep,
    // setActiveWizard: () => setActiveWizard(name),
    // nextStep,
    // previousStep,
    // finishWizard: () => finishWizard(name),
  };
};
