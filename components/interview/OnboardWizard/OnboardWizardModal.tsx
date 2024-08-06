import { useOnboardWizard } from './OnboardWizardContext';
import Dialog from '~/components/ui/Dialog';
import StepContent from './StepContent';

export default function OnboardWizardModal({
  stepContent,
  totalSteps,
}: {
  stepContent: React.ReactNode;
  totalSteps: number;
}) {
  const { closeWizard } = useOnboardWizard();
  return (
    <Dialog
      content={StepContent({ stepContent, totalSteps })}
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
    ></Dialog>
  );
}
