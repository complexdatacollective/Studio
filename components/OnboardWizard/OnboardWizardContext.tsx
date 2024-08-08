'use client';

import { createContext, useContext, useEffect, useState } from 'react';

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
  queueWizard: (
    wizard: string,
    hashedSteps: string,
    priority?: boolean,
  ) => void;
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
  const [queue, setQueue] = useState<{ wizard: string; hashedSteps: string }[]>(
    [],
  );

  const setStep = (step: number) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setCurrentStep(step);
  };

  const startWizard = (wizard: string, fromBeacon?: boolean) => {
    setShowFlow(!fromBeacon);
    setCurrentWizard(wizard);
    setIsOpen(true);
    setCurrentStep(0);
  };

  const closeWizard = () => {
    setCurrentWizard('');
    setIsOpen(false);
    setCurrentStep(0);
  };

  const toggleBeacons = () => {
    setBeaconsVisible(!beaconsVisible);
  };

  const queueWizard = (
    wizard: string,
    hashedSteps: string,
    priority?: boolean,
  ) => {
    if (priority) {
      startWizard(wizard);
      localStorage.setItem(`ONBOARD_WIZARD_${hashedSteps}`, 'true');
    } else {
      setQueue([...queue, { wizard, hashedSteps }]);
    }
  };

  // Start the next wizard in the queue if there is a queue and no wizard is open
  useEffect(() => {
    if (!isOpen && queue[0]) {
      startWizard(queue[0].wizard);
      localStorage.setItem(`ONBOARD_WIZARD_${queue[0].hashedSteps}`, 'true');

      setQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [isOpen, queue]);

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
        queueWizard,
      }}
    >
      {children}
    </OnboardWizardContext.Provider>
  );
};
