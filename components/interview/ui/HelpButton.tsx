import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useTranslations } from 'next-intl';
import { useWizardController } from '~/components/onboard-wizard/useWizardController';
import { Card, CardHeader } from '~/components/ui/Card';
import { env } from '~/env';
import { WIZARD_LOCAL_STORAGE_KEY } from '~/lib/onboarding-wizard/Provider';
import { getLocalisedValue } from '~/lib/localisation/utils';
import { renderLocalisedValue } from '~/components/RenderRichText';
import type { ReactNode } from 'react';
import Heading from '~/components/typography/Heading';
import { useDialogs } from '~/lib/dialogs/useDialogs';
import { Button } from '~/components/ui/Button';

const HelpCard = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: ReactNode;
  onClick: () => void;
}) => {
  return (
    <Card
      className="w-full cursor-pointer text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
    >
      <CardHeader>
        <Heading variant="h4">{title}</Heading>
        {description}
      </CardHeader>
    </Card>
  );
};

function AvailableWizardsPanel({
  handleClosePanel,
}: {
  handleClosePanel: () => void;
}) {
  const { wizards, setActiveWizard } = useWizardController();
  const t = useTranslations('Components.ContextualHelp');

  const handleStartWizard = (name: string) => {
    setActiveWizard(name);
    handleClosePanel();
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Object.entries(wizards)
          .map(([id, wizard]) => ({ id, ...wizard }))
          .map((wizard) => (
            <HelpCard
              key={wizard.id}
              title={getLocalisedValue(wizard.name, ['en'])}
              description={renderLocalisedValue(
                getLocalisedValue(wizard.description, ['en']),
              )}
              onClick={() => handleStartWizard(wizard.id)}
            />
          ))}
        <HelpCard
          title="Contact the study organiser"
          description="Click here if you would like to contact the organiser of this study"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('TODO: Implement contact organiser feature');
          }}
        />
      </div>
      {env.NODE_ENV === 'development' && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <Button
          variant="destructive"
          onClick={() => {
            localStorage.removeItem(WIZARD_LOCAL_STORAGE_KEY);
          }}
        >
          &nbsp; Dev mode: Reset local storage
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
