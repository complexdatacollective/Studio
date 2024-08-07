import { useOnboardWizard } from './OnboardWizardContext';
import Dialog from '~/components/ui/Dialog';
import FlowStepContent from './FlowStepContent';

export default function OnboardWizardModal({
  stepContent,
  totalSteps,
  showFlow,
}: {
  stepContent: React.ReactNode;
  totalSteps: number;
  showFlow: boolean;
}) {
  const { closeWizard } = useOnboardWizard();

  return (
    <Dialog
      content={
        showFlow ? FlowStepContent({ stepContent, totalSteps }) : stepContent
      }
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
    ></Dialog>
  );
}
