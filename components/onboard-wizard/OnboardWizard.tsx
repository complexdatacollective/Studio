'use client';

import type { Wizard } from '~/lib/onboarding-wizard/store';
import { useOnboardWizard } from './useOnboardWizard';

export default function OnboardWizard({ wizard }: { wizard: Wizard }) {
  useOnboardWizard(wizard);

  return null;
}
