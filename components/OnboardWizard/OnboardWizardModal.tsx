import Dialog from '~/components/ui/Dialog';
import React from 'react';
import { useWizardController } from './OnboardWizard';
import { Button } from '../ui/Button';

export default function OnboardWizardModal({
  content,
}: {
  content: React.ReactNode;
}) {
  const {
    closeWizard,
    nextStep,
    previousStep,
    hasNextStep,
    hasPreviousStep,
    progress,
  } = useWizardController();

  return (
    <Dialog
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
      className="w-[90vw] min-w-[450px]"
    >
      <div className="flex flex-col">
        {content}
        <footer className="flex items-center justify-between pt-2">
          {hasPreviousStep && (
            <Button name="previous" size="sm" onClick={() => previousStep()}>
              Prev
            </Button>
          )}
          <div className="text-sm">
            {progress.current} of {progress.total}
          </div>
          {hasNextStep ? (
            <Button name="next" size="sm" onClick={() => nextStep()}>
              Next
            </Button>
          ) : (
            <Button name="finish" size="sm" onClick={() => closeWizard()}>
              Finish
            </Button>
          )}
        </footer>
      </div>
    </Dialog>
  );
}
