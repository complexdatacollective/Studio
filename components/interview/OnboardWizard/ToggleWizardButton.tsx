'use client';

import { Button } from '~/components/ui/Button';
import { useOnboardWizard } from './OnboardWizardContext';

export default function ToggleWizardButton() {
  const { startWizard, closeWizard, isOpen } = useOnboardWizard();

  return (
    <Button
      onClick={() => {
        if (isOpen) {
          closeWizard();
        } else {
          startWizard();
        }
      }}
    >
      {isOpen ? 'Close Wizard' : 'Open Wizard'}
    </Button>
  );
}
