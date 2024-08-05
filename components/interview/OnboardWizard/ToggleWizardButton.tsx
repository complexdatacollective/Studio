'use client';

import { Button } from '~/components/ui/Button';
import { useOnboardWizard } from './OnboardWizardContext';

export default function ToggleWizardButton() {
  const { startWizard, closeWizard, isOpen, setStep, currentStep } =
    useOnboardWizard();

  const nextStep = () => {
    setStep(currentStep + 1);
  };

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  return (
    <div className="flex">
      <Button
        onClick={() => {
          if (isOpen) {
            closeWizard();
          } else {
            startWizard();
          }
        }}
      >
        {isOpen ? 'Close Wizard' : 'Open Wizard'}
      </Button>
      {isOpen && (
        <>
          <Button onClick={() => prevStep()}>Prev</Button>
          <Button onClick={() => nextStep()}>Next</Button>
        </>
      )}
    </div>
  );
}
