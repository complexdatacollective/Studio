import Popover from '~/components/ui/Popover';
import { Button } from '../ui/Button';
import { useWizardController } from './useWizardController';
import RenderRichText from '../RenderRichText';
import { useTranslations } from 'next-intl';
import { useElementPosition } from '~/lib/onboarding-wizard/utils';
import { type Step } from '~/lib/onboarding-wizard/store';
import Form from '../ui/form/Form';
import { generatePublicId } from '~/lib/generatePublicId';
import { ControlledDialog } from '~/lib/dialogs/ControlledDialog';

export default function WizardStep({ step }: { step: Step }) {
  const { title, content, targetElementId } = step;

  const {
    closeWizard,
    nextStep,
    previousStep,
    hasNextStep,
    hasPreviousStep,
    progress,
  } = useWizardController();

  const t = useTranslations('Generic');
  const position = useElementPosition(targetElementId);

  const renderContent = () => (
    <>
      <RenderRichText value={content} />
      <Form.Footer
        primaryAction={
          hasNextStep ? (
            <Button color="primary" onClick={() => nextStep()}>
              {t('Next')}
            </Button>
          ) : (
            <Button color="success" onClick={() => nextStep()}>
              {t('Done')}
            </Button>
          )
        }
        metaArea={
          <div className="hidden flex-1 items-center justify-center text-sm sm:flex">
            {progress.current} / {progress.total}
          </div>
        }
        secondaryAction={
          hasPreviousStep && (
            <Button onClick={() => previousStep()}>{t('Previous')}</Button>
          )
        }
      />
    </>
  );

  if (position) {
    return (
      <Popover
        title={title}
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
    <ControlledDialog
      id={generatePublicId()}
      open
      title={title}
      closeDialog={closeWizard}
    >
      {renderContent()}
    </ControlledDialog>
  );
}
