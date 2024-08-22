'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { Step, useWizardContext } from '~/lib/onboarding-wizard/Provider';
import OnboardWizardPopover from './OnboardWizardPopover';
import OnboardWizardModal from './OnboardWizardModal';
import { useLocale } from 'next-intl';

export const useWizardController = () => {
  const {
    setActiveWizard,
    nextStep,
    hasNextStep,
    previousStep,
    hasPreviousStep,
    progress,
  } = useWizardContext();

  const closeWizard = useCallback(
    () => setActiveWizard(null),
    [setActiveWizard],
  );

  return {
    closeWizard,
    nextStep,
    hasNextStep: hasNextStep(),
    previousStep,
    hasPreviousStep: hasPreviousStep(),
    progress,
  };
};

const useWizardStore = () => {
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
  };
};

const PopoverBackdrop = () => (
  <div className="absolute inset-0 z-10 backdrop-blur-sm backdrop-brightness-75 transition-all" />
);

export const Priorities = {
  ShowFirst: Infinity,
  UI: 100,
  Navigation: 50,
  Task: 10,
  ShowLast: -Infinity,
} as const;

type Priority = keyof typeof Priorities;

export default function OnboardWizard({
  children,
  name,
  steps,
  priority = 'Task',
}: {
  children: React.ReactNode;
  steps: Step[];
  name: string;
  priority?: Priority;
}) {
  const { isActive, activeStep } = useOnboardWizard({
    name, // maybe this is where we generate something relative to the study/protocol?
    steps,
    priority: Priorities[priority],
  });

  // Custom hook!
  // const beacons: Beacon[] = generateBeacons(steps);

  return (
    <>
      {children}
      {isActive && activeStep && (
        <>
          <PopoverBackdrop />
          <WizardStep step={activeStep} />
        </>
      )}
      {/* {showFlow &&
        beacons.map((beacon) =>
          // <Beacon
          //   key={beacon.id}
          //   position={beacon.position}
          //   onClick={() => activateWizard(beacon.stepIndex)}
          // />
          console.log('beacon'),
        )} */}
    </>
  );
}

const WizardStep = ({ step }: { step: Step }) => {
  const { targetElementId, content } = step;
  const locale = useLocale();

  return targetElementId ? (
    <OnboardWizardPopover
      targetElementId={targetElementId}
      content={content[locale]}
    />
  ) : (
    <OnboardWizardModal content={content[locale]} />
  );
};
