import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useTranslations } from 'next-intl';
import { useWizardController } from '~/components/onboard-wizard/useWizardController';
import { env } from '~/env';
import { WIZARD_LOCAL_STORAGE_KEY } from '~/lib/onboarding-wizard/Provider';
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

  const t = useTranslations('Interview.Navigation.HelpButton');
  const genericT = useTranslations('Generic');

  const handleOpenDialog = async () => {
    const result = await openDialog<string>({
      type: 'custom',
      id: 'help-dialog',
      title: t('Dialog.Title'),
      description: t('Dialog.Description'),
      renderContent: (resolve) => (
        <>
          <div className="mt-4 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(wizards)
                .map(([id, wizard]) => ({ id, ...wizard }))
                .map((wizard) => (
                  <Card
                    key={wizard.id}
                    title={wizard.name}
                    onClick={() => resolve(wizard.id)}
                  >
                    {renderLocalisedValue(wizard.description)}
                  </Card>
                ))}
              <Card
                title={t('Dialog.Options.Contact.Title')}
                description={t('Dialog.Options.Contact.Description')}
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('TODO: Implement contact organiser feature');
                }}
              />
            </div>
          </div>
          <Form.Footer
            secondaryAction={
              env.NODE_ENV === 'development' && (
                <>
                  <Button onClick={() => resolve(null)}>
                    {genericT('Cancel')}
                  </Button>
                  <Button
                    color="destructive"
                    onClick={() => {
                      localStorage.removeItem(WIZARD_LOCAL_STORAGE_KEY);
                      resolve(null);
                    }}
                  >
                    Dev mode: Reset local storage
                  </Button>
                </>
              )
            }
          />
        </>
      ),
    });
    if (result) {
      setActiveWizard(result);
    }
  };

  return (
    <>
      <NavButtonWithTooltip
        id={id}
        tooltipContent={t('Tooltip')}
        onClick={handleOpenDialog}
      >
        <HelpCircle className="h-10 w-10 stroke-[2px]" />
      </NavButtonWithTooltip>
    </>
  );
}
