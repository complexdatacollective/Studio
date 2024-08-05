import { Button } from '~/components/ui/Button';
import Popover from '~/components/ui/Popover';
import { useOnboardWizard } from './OnboardWizardContext';

export default function OnboardWizardPopover({
  stepContent,
  elementPosition,
}: {
  stepContent: React.ReactNode;
  elementPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
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
        <Button onClick={() => prevStep()}>Prev</Button>
        <Button onClick={() => nextStep()}>Next</Button>
      </div>
    </div>
  );
  return (
    <Popover content={popoverContent} modal={true} isOpen={true}>
      <div
        style={{
          top: elementPosition.top,
          left: elementPosition.left,
          width: elementPosition.width,
          height: elementPosition.height,
          zIndex: 100,
        }}
        className="absolute border-2 border-mustard"
      />
    </Popover>
  );
}
