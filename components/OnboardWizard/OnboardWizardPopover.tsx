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

  let side = 'right' as 'right' | 'left' | 'top' | 'bottom';

  // Override default side if element is too close to the top or bottom of the screen
  if (elementPosition.top < 100) {
    side = 'bottom';
  } else if (elementPosition.top > window.innerHeight - 100) {
    side = 'top';
  }

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
      side={side}
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
