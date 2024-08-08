// Development tool to reset the OnboardWizard localStorage
// eventually, use NODE_ENV to conditionally render this

import { Button } from '~/components/ui/Button';

export default function ResetLocalStorage() {
  return (
    <Button
      onClick={() => {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('ONBOARD_WIZARD')) {
            localStorage.removeItem(key);
          }
        });
        window.location.reload();
      }}
    >
      Dev: Reset OnboardWizard localStorage
    </Button>
  );
}
