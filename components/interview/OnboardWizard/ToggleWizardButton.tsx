'use client';

import { Button } from '~/components/ui/Button';
import { useOnboardWizard } from './OnboardWizardContext';

export default function ToggleWizardButton() {
  const { startWizard } = useOnboardWizard();

  return (
    <div>
      <Button
        onClick={() => {
          startWizard();
        }}
      >
        Open Wizard
      </Button>
    </div>
  );
}
