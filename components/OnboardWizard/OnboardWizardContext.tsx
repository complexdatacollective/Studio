'use client';

import { createContext, useContext, useState } from 'react';

type OnboardWizardContextType = {
  currentWizard: string;
  currentStep: number;
  setStep: (step: number) => void;
  closeWizard: () => void;
  startWizard: (wizard: string, fromBeacon?: boolean) => void;
  isOpen: boolean;
  beaconsVisible: boolean;
  toggleBeacons: () => void;
  showFlow: boolean;
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
  const [currentWizard, setCurrentWizard] = useState('');
  const [beaconsVisible, setBeaconsVisible] = useState(false);
  const [showFlow, setShowFlow] = useState(true);

  const setStep = (step: number) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setCurrentStep(step);
  };

  const closeWizard = () => {
    setCurrentWizard('');
    setIsOpen(false);
    setCurrentStep(0);
  };

  const startWizard = (wizard: string, fromBeacon?: boolean) => {
    setShowFlow(!fromBeacon);
    setCurrentWizard(wizard);
    setIsOpen(true);
    setCurrentStep(0);
  };

  const toggleBeacons = () => {
    setBeaconsVisible(!beaconsVisible);
  };

  return (
    <OnboardWizardContext.Provider
      value={{
        currentWizard,
        currentStep,
        setStep,
        closeWizard,
        startWizard,
        isOpen,
        beaconsVisible,
        toggleBeacons,
        showFlow,
      }}
    >
      {children}
    </OnboardWizardContext.Provider>
  );
};
