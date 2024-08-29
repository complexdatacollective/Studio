import Dialog from '~/components/ui/Dialog';
import Popover from '~/components/ui/Popover';
import { Button } from '../ui/Button';
import { useWizardController } from './useWizardController';
import RenderRichText from '../RenderRichText';
import { useLocale, useTranslations } from 'next-intl';
import { getElementPosition } from '~/lib/onboarding-wizard/utils';
import { type Step } from '~/lib/onboarding-wizard/store';
import { getLocalisedValue } from '~/lib/localisation/utils';
import { useEffect, useState } from 'react';

export default function WizardStep({ step }: { step: Step }) {
  const { title, content, targetElementId } = step;
  const locale = useLocale();

  const localisedStepContent = getLocalisedValue(content, [locale]);
  const localisedStepTitle = getLocalisedValue(title, [locale]);

  const {
    closeWizard,
    nextStep,
    previousStep,
    hasNextStep,
    hasPreviousStep,
    progress,
  } = useWizardController();

  const t = useTranslations('Generic');
  const [position, setPosition] = useState(getElementPosition(targetElementId));

  useEffect(() => {
    const updatePosition = () => {
      setPosition(getElementPosition(targetElementId));
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => window.removeEventListener('resize', updatePosition);
  }, [targetElementId]);

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
            {t('Previous')}
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
            {t('Next')}
          </Button>
        ) : (
          <Button onClick={() => nextStep()} className="flex-1">
            {t('Done')}
          </Button>
        )}
      </footer>
    </div>
  );

  if (position) {
    return (
      <Popover
        title={localisedStepTitle}
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
      title={localisedStepTitle}
    >
      {renderContent()}
    </Dialog>
  );
}
