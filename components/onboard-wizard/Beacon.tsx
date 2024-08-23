import { HelpCircleIcon } from 'lucide-react';
import { getElementPosition } from '~/lib/onboarding-wizard/utils';
import { cn } from '~/lib/utils';

export default function Beacon({
  targetElementId,
  label,
}: {
  targetElementId: string;
  label: string;
}) {
  const position = getElementPosition(targetElementId);

  if (!position) {
    console.log('no position...');
    // throw Error(`Element with id ${targetElementId} not found!`);
    return null;
  }

  // const { setStep, startWizard } = useOnboardWizard();

  // const openStep = () => {
  //   startWizard(wizardName, true);
  //   setStep(index);
  // };

  return (
    <button
      title={label}
      aria-label={label}
      className={cn(
        'absolute h-4 w-4 rounded-full bg-accent',
        'hover:h-6 hover:w-6',
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={() => {
        // openStep();
      }}
    >
      <HelpCircleIcon />
    </button>
  );
}
