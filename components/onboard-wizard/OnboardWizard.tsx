'use client';

import OnboardWizardPopover from './OnboardWizardPopover';
import OnboardWizardModal from './OnboardWizardModal';
import { useLocale } from 'next-intl';
import { type Step } from '~/lib/onboarding-wizard/store';
import { useOnboardWizard } from './useOnboardWizard';
import PopoverBackdrop from './PopoverBackdrop';
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
  const locale = useLocale();

  const { isActive, activeStep, showBeacons } = useOnboardWizard({
    name, // maybe this is where we generate something relative to the study/protocol?
    steps,
    priority: Priorities[priority],
  });

  return (
    <>
      {children}
      {isActive && activeStep && (
        <>
          <PopoverBackdrop />
          {activeStep.targetElementId ? (
            <OnboardWizardPopover
              targetElementId={activeStep.targetElementId}
              content={activeStep.content[locale]}
            />
          ) : (
            <OnboardWizardModal content={activeStep.content[locale]} />
          )}
        </>
      )}
      {showBeacons &&
        steps
          .filter((step: Step) => !!step.targetElementId)
          .map((step, index) => (
            <Beacon
              key={`${name}_${index}`}
              targetElementId={step.targetElementId!}
              label={step.label[locale] ?? 'Help'}
            />
          ))}
    </>
  );
}
