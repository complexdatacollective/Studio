import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useLocale, useTranslations } from 'next-intl';
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
  const locale = useLocale();

  const t = useTranslations('Interview.Navigation');
  const t2 = useTranslations('Components.ContextualHelp');
  const t3 = useTranslations('Components.ContextualHelp.ContactCard');

  const fetchLocalizedWizards = async () => {
    const localizedWizards = await Promise.all(
      Object.entries(wizards).map(async ([id, wizard]) => ({
        id,
        name: await getLocalisedValue(wizard.name, locale),
        description: await getLocalisedValue(wizard.description, locale),
      })),
    );
    return localizedWizards;
  };

  const handleOpenDialog = async () => {
    // Return type should be string | null
    const localizedWizards = await fetchLocalizedWizards();

    const result = await openDialog<string>({
      type: 'custom',
      id: 'help-dialog',
      title: t2('Title'),
      description: t2('Description'),
      renderContent: (resolve) => (
        <>
          <div className="mt-4 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              {localizedWizards.map((wizard) => (
                <Card
                  key={wizard.id}
                  title={wizard.name ?? ''}
                  onClick={() => resolve(wizard.id)}
                >
                  {wizard.description &&
                    renderLocalisedValue(wizard.description)}
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
            secondaryAction={
              env.NODE_ENV === 'development' && (
                <>
                  <Button onClick={() => resolve(null)}>Cancel</Button>
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
        tooltipContent={t('Help')}
        onClick={handleOpenDialog}
      >
        <HelpCircle className="h-10 w-10 stroke-[2px]" />
      </NavButtonWithTooltip>
    </>
  );
}
