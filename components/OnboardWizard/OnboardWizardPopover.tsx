import Popover from '~/components/ui/Popover';
import { getElementPosition } from '~/lib/onboardWizard/utils';
import { useWizardController } from './OnboardWizard';
import { Button } from '../ui/Button';

export default function OnboardWizardPopover({
  content,
  targetElementId,
}: {
  content: React.ReactNode;
  targetElementId: string;
}) {
  const {
    closeWizard,
    progress,
    hasNextStep,
    hasPreviousStep,
    previousStep,
    nextStep,
  } = useWizardController();
  const position = getElementPosition(targetElementId);

  if (!position) {
    console.log('no position...');
    // throw Error(`Element with id ${targetElementId} not found!`);
    return null;
  }

  let side = 'right' as 'right' | 'left' | 'top' | 'bottom';

  // Override default side if element is too close to the top or bottom of the screen
  if (position.top < 100) {
    side = 'bottom';
  } else if (position.top > window.innerHeight - 100) {
    side = 'top';
  }

  return (
    <Popover
      content={
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
      }
      modal={true}
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
      side={side}
    >
      <div
        style={{
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height,
        }}
        className="absolute z-50"
      />
    </Popover>
  );
}
