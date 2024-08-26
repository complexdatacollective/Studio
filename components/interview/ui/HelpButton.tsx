import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';
import { useWizardController } from '~/components/onboard-wizard/useWizardController';
import { Button } from '~/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';

function AvailableWizardsPanel() {
  const { wizards, setActiveWizard } = useWizardController();
  const t = useTranslations('ContextSpecificHelp');

  return (
    <Card className="absolute bottom-10 left-1/2 -translate-x-1/2 transform shadow-lg">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        {wizards.map((wizard) => (
          <Button
            key={wizard.name}
            onClick={() => setActiveWizard(wizard.name)}
          >
            {wizard.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * Button to be added to the main navigation, which triggers the help popover.
 * This popover allows the participant to trigger help wizards.
 */
export default function HelpButton({ id }: { id?: string }) {
  const { showBeacons, setShowBeacons } = useWizardController();

  const t = useTranslations('Navigation');
  return (
    <>
      <NavButtonWithTooltip
        id={id}
        aria-label={t('help')}
        title={t('help')}
        tooltipSide="right"
        onClick={() => setShowBeacons(!showBeacons)}
      >
        <HelpCircle className="h-10 w-10 stroke-[2px]" />
      </NavButtonWithTooltip>
      {showBeacons && createPortal(<AvailableWizardsPanel />, document.body)}
    </>
  );
}
