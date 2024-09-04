import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useTranslations } from 'next-intl';
import { useWizardController } from '~/components/onboard-wizard/useWizardController';
import { env } from '~/env';
import { WIZARD_LOCAL_STORAGE_KEY } from '~/lib/onboarding-wizard/Provider';
import { getLocalisedValue } from '~/lib/localisation/utils';
import { renderLocalisedValue } from '~/components/RenderRichText';
import { useDialogs } from '~/lib/dialogs/useDialogs';
import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';

function AvailableWizardsPanel({
  handleClosePanel,
}: {
  handleClosePanel: () => void;
}) {
  const { wizards, setActiveWizard } = useWizardController();
  const t = useTranslations('Components.ContextualHelp.ContactCard');

  const handleStartWizard = (name: string) => {
    setActiveWizard(name);
    handleClosePanel();
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(wizards)
          .map(([id, wizard]) => ({ id, ...wizard }))
          .map((wizard) => (
            <Card
              key={wizard.id}
              title={getLocalisedValue(wizard.name, ['en'])}
              onClick={() => handleStartWizard(wizard.id)}
            >
              {renderLocalisedValue(
                getLocalisedValue(wizard.description, ['en']),
              )}
            </Card>
          ))}
        <Card
          title={t('Title')}
          description={t('Description')}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('TODO: Implement contact organiser feature');
          }}
        />
      </div>
      {env.NODE_ENV === 'development' && (
        <Button
          color="destructive"
          onClick={() => {
            localStorage.removeItem(WIZARD_LOCAL_STORAGE_KEY);
          }}
        >
          Dev mode: Reset local storage
        </Button>
      )}
    </div>
  );
}

/**
 * Button to be added to the main navigation, which triggers the help popover.
 * This popover allows the participant to trigger help wizards.
 */
export default function HelpButton({ id }: { id?: string }) {
  const { openDialog, closeDialog } = useDialogs();

  const t = useTranslations('Interview.Navigation');
  const t2 = useTranslations('Components.ContextualHelp');

  const dialog = {
    id: 'help-dialog',
    title: t2('Title'),
    description: t2('Description'),
    content: <AvailableWizardsPanel handleClosePanel={closeDialog} />,
  };

  const handleOpenDialog = () => {
    openDialog(dialog);
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
