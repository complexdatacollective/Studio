import Popover from '~/components/ui/Popover';
import { useOnboardWizard } from './OnboardWizardContext';
import StepContent from './StepContent';

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
  const { closeWizard } = useOnboardWizard();

  return (
    <Popover
      content={StepContent({ stepContent, totalSteps })}
      modal={true}
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
      side="right"
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
