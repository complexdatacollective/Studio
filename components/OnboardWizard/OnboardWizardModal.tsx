import { useOnboardWizard } from './OnboardWizardContext';
import Dialog from '~/components/ui/Dialog';
import FlowStepContent from './FlowStepContent';
import React from 'react';

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

  const mediaCheck = (content: React.ReactNode): boolean => {
    return React.Children.toArray(content).some((child) => {
      return (
        React.isValidElement(child) &&
        (child.type === 'img' || child.type === 'video')
      );
    });
  };

  const hasMedia = mediaCheck(stepContent);

  return (
    <Dialog
      content={
        showFlow ? FlowStepContent({ stepContent, totalSteps }) : stepContent
      }
      isOpen={true}
      onOpenChange={() => {
        closeWizard();
      }}
      className={` ${hasMedia ? 'w-1/2' : 'w-[90vw] max-w-[450px]'}`}
    ></Dialog>
  );
}
