'use client';

import { Button } from '~/components/ui/Button';
import { useOnboardWizard } from './OnboardWizardContext';

export default function HelpModeButton() {
  const { toggleBeacons } = useOnboardWizard();
  return (
    <Button variant="accent" onClick={() => toggleBeacons()}>
      help mode
    </Button>
  );
}
