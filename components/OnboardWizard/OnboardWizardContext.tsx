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
  queueWizard: (wizard: string, hashedSteps: string, priority?: number) => void;
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
  const [queue, setQueue] = useState<
    { wizard: string; hashedSteps: string; priority?: number }[]
  >([]);

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
    priority?: number,
  ) => {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue, { wizard, hashedSteps, priority }];

      newQueue.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

      return newQueue;
    });
  };

  // Start the next wizard in the queue if there is a queue and no wizard is open
  useEffect(() => {
    if (!isOpen && queue[0]) {
      const highestPriorityWizard = queue[0];
      startWizard(highestPriorityWizard.wizard);
      localStorage.setItem(
        `ONBOARD_WIZARD_${highestPriorityWizard.hashedSteps}`,
        'true',
      );

      // Remove the started wizard from the queue
      setQueue((prevQueue) =>
        prevQueue.filter(
          (item) => item.hashedSteps !== highestPriorityWizard.hashedSteps,
        ),
      );
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
