import { Button } from '~/components/ui/Button';
import { useOnboardWizard } from './OnboardWizardContext';
import Dialog from '~/components/ui/Dialog';

export default function OnboardWizardModal({
  stepContent,
  totalSteps,
}: {
  stepContent: React.ReactNode;
  totalSteps: number;
}) {
  const { closeWizard, setStep, currentStep } = useOnboardWizard();

  const nextStep = () => {
    setStep(currentStep + 1);
  };

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  const dialogContent = (
    <div className="flex flex-col">
      {stepContent}

      <div className="flex items-center justify-between pt-2">
        {currentStep !== 0 && (
          <Button name="previous" size="sm" onClick={() => prevStep()}>
            Prev
          </Button>
        )}
        <div className="text-sm">
          {currentStep + 1} of {totalSteps}
        </div>
        {currentStep < totalSteps - 1 ? (
          <Button name="next" size="sm" onClick={() => nextStep()}>
            Next
          </Button>
        ) : (
          <Button name="finish" size="sm" onClick={() => closeWizard()}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <Dialog
      content={dialogContent}
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
    ></Dialog>
  );
}
