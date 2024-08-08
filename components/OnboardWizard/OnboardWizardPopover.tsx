import Popover from '~/components/ui/Popover';
import { useOnboardWizard } from './OnboardWizardContext';
import FlowStepContent from './FlowStepContent';

export default function OnboardWizardPopover({
  stepContent,
  elementPosition,
  totalSteps,
  showFlow,
}: {
  stepContent: React.ReactNode;
  elementPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  totalSteps: number;
  showFlow: boolean;
}) {
  const { closeWizard } = useOnboardWizard();

  return (
    <Popover
      content={
        showFlow ? FlowStepContent({ stepContent, totalSteps }) : stepContent
      }
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
