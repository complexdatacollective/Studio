'use client';

import WizardStep from './WizardStep';
import { type Step } from '~/lib/onboarding-wizard/store';
import { useOnboardWizard } from './useOnboardWizard';
import PopoverBackdrop from '../PopoverBackdrop';
import Beacon from './Beacon';

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
  const { isActive, activeStep, showBeacons } = useOnboardWizard({
    name, // maybe this is where we generate something relative to the study/protocol?
    steps,
    priority: Priorities[priority],
  });

  return (
    <>
      {children}
      {isActive && activeStep && <WizardStep step={activeStep} />}
      {showBeacons &&
        steps
          .filter((step: Step) => !!step.targetElementId)
          .map((step, index) => (
            <Beacon
              key={`${name}_${index}`}
              wizardName={name}
              wizardStep={index}
              targetElementId={step.targetElementId!}
            />
          ))}
    </>
  );
}
