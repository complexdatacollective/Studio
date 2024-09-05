import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useTranslations } from 'next-intl';
import { useWizardController } from '~/components/onboard-wizard/useWizardController';
import { env } from '~/env';
import { WIZARD_LOCAL_STORAGE_KEY } from '~/lib/onboarding-wizard/Provider';
import { getLocalisedValue } from '~/lib/localisation/utils';
import { renderLocalisedValue } from '~/components/RenderRichText';
import { useDialog } from '~/lib/dialogs/DialogProvider';
import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import Form from '~/components/ui/form/Form';
/**
 * Button to be added to the main navigation, which triggers the help popover.
 * This popover allows the participant to trigger help wizards.
 */
export default function HelpButton({ id }: { id?: string }) {
  const { openDialog } = useDialog();
  const { wizards, setActiveWizard } = useWizardController();

  const t = useTranslations('Interview.Navigation');
  const t2 = useTranslations('Components.ContextualHelp');
  const t3 = useTranslations('Components.ContextualHelp.ContactCard');

  const dialog = {
    id: 'help-dialog',
    title: t2('Title'),
    description: t2('Description'),
    type: 'form',
    content: (resolve) => (
      <>
        <div className="mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(wizards)
              .map(([id, wizard]) => ({ id, ...wizard }))
              .map((wizard) => (
                <Card
                  key={wizard.id}
                  title={getLocalisedValue(wizard.name, ['en'])}
                  onClick={() => resolve(wizard.id)}
                >
                  {renderLocalisedValue(
                    getLocalisedValue(wizard.description, ['en']),
                  )}
                </Card>
              ))}
            <Card
              title={t3('Title')}
              description={t3('Description')}
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('TODO: Implement contact organiser feature');
              }}
            />
          </div>
        </div>
        <Form.Footer
          primaryAction={
            <Button color="primary" onClick={() => resolve(false)}>
              Cancel
            </Button>
          }
          secondaryAction={
            env.NODE_ENV === 'development' && (
              <Button
                color="destructive"
                onClick={() => {
                  localStorage.removeItem(WIZARD_LOCAL_STORAGE_KEY);
                }}
              >
                Dev mode: Reset local storage
              </Button>
            )
          }
        />
      </>
    ),
  };

  const handleOpenDialog = async () => {
    const result = await openDialog(dialog);
    console.log('got result', result);
    if (result) {
      setActiveWizard(result);
    }
  };

  return (
    <>
      <NavButtonWithTooltip
        id={id}
        title={t('Help')}
        tooltipSide="right"
        onClick={handleOpenDialog}
      >
        <HelpCircle className="h-10 w-10 stroke-[2px]" />
      </NavButtonWithTooltip>
    </>
  );
}
