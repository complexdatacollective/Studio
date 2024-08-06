import { useOnboardWizard } from './OnboardWizardContext';
import type { Step } from './types';
import { cn } from '~/lib/utils';

export default function Beacon({
  step,
  position,
}: {
  step: Step;
  position: { top: number; left: number };
}) {
  const { setStep, startWizard } = useOnboardWizard();

  const openStep = () => {
    startWizard();
    setStep(step.id - 1);
  };

  return (
    <button
      name={`beacon-${step.id}`}
      className={cn(
        'absolute h-4 w-4 rounded-full bg-purple-pizazz',
        'hover:h-6 hover:w-6',
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={() => {
        openStep();
      }}
    />
  );
}
