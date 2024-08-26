import { HelpCircleIcon } from 'lucide-react';
import { getElementPosition } from '~/lib/onboarding-wizard/utils';
import { cn } from '~/lib/utils';
import { useWizardController } from './useWizardController';

export default function Beacon({
  targetElementId,
}: {
  targetElementId: string;
}) {
  const position = getElementPosition(targetElementId);

  // const { openStep } = useWizardController();

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
      tabIndex={0}
      className="absolute inline-flex"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-info duration-1000 motion-safe:animate-ping" />
      <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-info text-info-foreground">
        <span className="text-base">?</span>
      </div>
    </button>
  );
}
