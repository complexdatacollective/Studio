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
    <div className="flex flex-col">
      <RenderRichText value={localisedStepContent} />
      <footer className="flex items-center justify-between pt-2">
        {hasPreviousStep && (
          <Button name="previous" size="sm" onClick={() => previousStep()}>
            {t('previous')}
          </Button>
        )}
        <div className="text-sm">
          {progress.current} / {progress.total}
        </div>
        {hasNextStep ? (
          <Button name="next" size="sm" onClick={() => nextStep()}>
            {t('next')}
          </Button>
        ) : (
          <Button name="finish" size="sm" onClick={() => nextStep()}>
            {t('done')}
          </Button>
        )}
      </footer>
    </div>
  );

  // Boost z-index of element so it is above the overlay
  useEffect(() => {
    if (!targetElementId) {
      return;
    }

    const targetElement = document.getElementById(targetElementId);

    if (!targetElement) {
      return;
    }

    targetElement.style.zIndex = '50';

    return () => {
      // cleanup
      targetElement.style.zIndex = '';
    };
  }, [targetElementId]);

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
      className="w-[90vw] min-w-[450px]"
    >
      {renderContent()}
    </Dialog>
  );
}
