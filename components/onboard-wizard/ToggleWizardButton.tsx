'use client';

import { Button } from '~/components/ui/Button';

export default function ToggleWizardButton({
  // wizardName,
  label,
}: {
  // wizardName: string;
  label: string;
}) {
  // const { startWizard } = useOnboardWizard();

  return (
    <div>
      <Button
        color="accent"
        onClick={() => {
          // startWizard(wizardName);
        }}
      >
        {label}
      </Button>
    </div>
  );
}
