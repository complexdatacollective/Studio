import { getElementPosition } from '~/lib/onboarding-wizard/utils';
import { cn } from '~/lib/utils';
import { useWizardController } from './useWizardController';

export default function Beacon({
  targetElementId,
  wizardName,
  wizardStep,
}: {
  targetElementId: string;
  wizardName: string;
  wizardStep: number;
}) {
  const position = getElementPosition(targetElementId);

  const { setActiveWizard } = useWizardController();

  if (!position) {
    console.log('no position...');
    // throw Error(`Element with id ${targetElementId} not found!`);
    return null;
  }

  return (
    <button
      tabIndex={0}
      className={cn('absolute inline-flex')}
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={() => setActiveWizard(wizardName, wizardStep)}
    >
      <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-info duration-1000 group-hover:animate-none motion-safe:animate-ping" />
      <div className="group z-10 flex h-8 w-8 items-center justify-center rounded-full bg-info text-info-foreground transition-transform hover:scale-125">
        <span className="text-base">?</span>
      </div>
    </button>
  );
}
