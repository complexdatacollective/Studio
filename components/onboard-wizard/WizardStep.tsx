import Dialog from '~/components/ui/Dialog';
import Popover from '~/components/ui/Popover';
import React, { useEffect } from 'react';
import { Button } from '../ui/Button';
import { useWizardController } from './useWizardController';
import RenderRichText from '../RenderRichText';
import { useLocale, useTranslations } from 'next-intl';
import { getElementPosition } from '~/lib/onboarding-wizard/utils';
import { type Step } from '~/lib/onboarding-wizard/store';
import { getLocalisedValue } from '~/lib/localisation/utils';

export default function WizardStep({ step }: { step: Step }) {
  const { content, targetElementId } = step;
  const locale = useLocale();

  const localisedStepContent = getLocalisedValue(content, [locale]);

  const {
    closeWizard,
    nextStep,
    previousStep,
    hasNextStep,
    hasPreviousStep,
    progress,
  } = useWizardController();

  const t = useTranslations('Generic');
  const position = getElementPosition(targetElementId);

  const renderContent = () => (
    <div className="flex flex-col gap-2">
      <RenderRichText value={localisedStepContent} />
      <footer className="-mb-4 flex justify-between">
        {hasPreviousStep && (
          <Button
            variant="outline"
            onClick={() => previousStep()}
            className="flex-1"
          >
            {t('previous')}
          </Button>
        )}
        <div className="flex flex-1 items-center justify-center text-sm">
          {progress.current} / {progress.total}
        </div>
        {hasNextStep ? (
          <Button
            variant="primary"
            onClick={() => nextStep()}
            className="flex-1"
          >
            {t('next')}
          </Button>
        ) : (
          <Button onClick={() => nextStep()} className="flex-1">
            {t('done')}
          </Button>
        )}
      </footer>
    </div>
  );

  if (position) {
    return (
      <Popover
        content={renderContent()}
        modal
        isOpen
        onOpenChange={() => {
          closeWizard();
        }}
      >
        <div
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
            height: position.height,
          }}
          className="absolute z-50"
        />
      </Popover>
    );
  }

  return (
    <Dialog
      isOpen
      onOpenChange={() => {
        closeWizard();
      }}
    >
      {renderContent()}
    </Dialog>
  );
}
