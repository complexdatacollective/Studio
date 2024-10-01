import type { Wizard } from '~/lib/onboarding-wizard/store';
import OnboardWizard from './OnboardWizard';

// A HOC that wraps a stage with an onboarding wizard
export function withOnboardingWizard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  getWizard: (props: P) => Wizard, // function to create a wizard
) {
  const WithOnboardingWizard = (props: P) => {
    const wizard = getWizard(props);
    return (
      <>
        <OnboardWizard wizard={wizard} />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithOnboardingWizard;
}
