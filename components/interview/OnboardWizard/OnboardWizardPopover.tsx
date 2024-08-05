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
  const { closeWizard, isOpen, setStep, currentStep } = useOnboardWizard();

  const nextStep = () => {
    setStep(currentStep + 1);
  };

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  const popoverContent = (
    <div className="flex flex-col">
      {stepContent}
      <div className="flex justify-between pt-2">
        {currentStep + 1} / {totalSteps}
        {currentStep !== 0 && <Button onClick={() => prevStep()}>Prev</Button>}
        {currentStep < totalSteps - 1 ? (
          <Button onClick={() => nextStep()}>Next</Button>
        ) : (
          <Button onClick={() => closeWizard()}>Finish</Button>
        )}
      </div>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      modal={true}
      isOpen={isOpen}
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
