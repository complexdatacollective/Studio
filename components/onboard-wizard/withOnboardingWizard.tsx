import type { Wizard } from '~/lib/onboarding-wizard/store';
import type { InterviewStage } from '../interview/ui/InterviewShell';
import OnboardWizard from './OnboardWizard';

// A HOC that wraps a stage with an onboarding wizard
export function withOnboardingWizard<T extends InterviewStage>(
  WrappedComponent: React.ComponentType<T>,
  wizard: Wizard,
) {
  const WithOnboardingWizard = ({ ...props }: T) => {
    return (
      <>
        <OnboardWizard wizard={wizard} />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithOnboardingWizard;
}
