import type { Wizard } from '~/lib/onboarding-wizard/store';
import OnboardWizard from './OnboardWizard';

export function withOnboardingWizard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  getWizard: () => Wizard, // function to create a wizard
) {
  const WithOnboardingWizard = (props: P) => {
    const wizard = getWizard();
    return (
      <>
        <OnboardWizard wizard={wizard} />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithOnboardingWizard;
}
