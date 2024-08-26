'use client';

import { Button } from '~/components/ui/Button';

export default function ToggleWizardButton({
  wizardName,
  label,
}: {
  wizardName: string;
  label: string;
}) {
  // const { startWizard } = useOnboardWizard();

  return (
    <div>
      <Button
        variant="accent"
        onClick={() => {
          // startWizard(wizardName);
        }}
      >
        {label}
      </Button>
    </div>
  );
}