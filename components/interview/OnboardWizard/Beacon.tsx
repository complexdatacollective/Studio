import { useOnboardWizard } from './OnboardWizardContext';
import type { Step } from './types';

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
    <div
      className="h-4 w-4 rounded-full bg-purple-pizazz"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
      }}
      onClick={() => {
        openStep();
      }}
    />
  );
}
