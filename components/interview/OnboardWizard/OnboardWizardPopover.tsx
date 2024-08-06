import { Button } from '~/components/ui/Button';
import Popover from '~/components/ui/Popover';
import { useOnboardWizard } from './OnboardWizardContext';

export default function OnboardWizardPopover({
  stepContent,
  elementPosition,
  totalSteps,
}: {
  stepContent: React.ReactNode;
  elementPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  totalSteps: number;
}) {
  const { closeWizard, setStep, currentStep } = useOnboardWizard();

  const nextStep = () => {
    setStep(currentStep + 1);
  };

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  const popoverContent = (
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
    <Popover
      content={popoverContent}
      modal={true}
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
    >
      {/* spotlight */}
      <div
        style={{
          top: elementPosition.top,
          left: elementPosition.left,
          width: elementPosition.width,
          height: elementPosition.height,
        }}
        className="absolute z-50"
      />
    </Popover>
  );
}
