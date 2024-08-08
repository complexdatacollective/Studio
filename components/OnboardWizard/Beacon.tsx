import { useOnboardWizard } from './OnboardWizardContext';
import { cn } from '~/lib/utils';

export default function Beacon({
  index,
  position,
  wizardName,
}: {
  index: number;
  position: { top: number; left: number };
  wizardName: string;
}) {
  const { setStep, startWizard } = useOnboardWizard();

  const openStep = () => {
    startWizard(wizardName, true);
    setStep(index);
  };

  return (
    <button
      title={`beacon-${index}`}
      name={`beacon-${index}`}
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
