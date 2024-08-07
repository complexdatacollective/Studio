'use client';

import { createContext, useContext, useState } from 'react';

type OnboardWizardContextType = {
  currentStep: number;
  setStep: (step: number) => void;
  closeWizard: () => void;
  startWizard: () => void;
  isOpen: boolean;
};

const OnboardWizardContext = createContext<OnboardWizardContextType | null>(
  null,
);

export function useOnboardWizard() {
  const context = useContext(OnboardWizardContext);
  if (!context) {
    throw new Error(
      'useOnboardWizard must be used within a OnboardWizardProvider',
    );
  }
  return context;
}

export const OnboardWizardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const setStep = (step: number) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setCurrentStep(step);
  };

  const closeWizard = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  const startWizard = () => {
    setIsOpen(true);
    setCurrentStep(0);
  };

  return (
    <OnboardWizardContext.Provider
      value={{
        currentStep,
        setStep,
        closeWizard,
        startWizard,
        isOpen,
      }}
    >
      {children}
    </OnboardWizardContext.Provider>
  );
};
