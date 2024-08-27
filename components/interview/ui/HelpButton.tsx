import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useTranslations } from 'next-intl';
import { useWizardController } from '~/components/onboard-wizard/useWizardController';
import { Button } from '~/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';
import { env } from '~/env';
import { WIZARD_LOCAL_STORAGE_KEY } from '~/lib/onboarding-wizard/Provider';
import useToggleState from '~/hooks/useToggleState';
import ModalOverlay from '~/components/ui/form/ModalOverlay';
import { motion } from 'framer-motion';
import CloseButton from '~/components/ui/CloseButton';
import { DialogClose } from '@radix-ui/react-dialog';
import { getLocalisedValue } from '~/lib/localisation/utils';
import { renderLocalisedValue } from '~/components/RenderRichText';
import type { ReactNode } from 'react';
import Heading from '~/components/typography/Heading';

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
      className="cursor-pointer text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
    >
      <CardHeader>
        <Heading variant="h4">{title}</Heading>
        {description}
      </CardHeader>
    </Card>
  );
};

const MotionCard = motion(Card);

const dialogVariants = {
  closed: { opacity: 0, y: '100%' },
  open: { opacity: 1, y: 0 },
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
    <MotionCard
      className="fixed bottom-10 left-1/2 z-50 w-10/12 max-w-4xl -translate-x-1/2 p-6 shadow-lg"
      // Needed because overwise the inline style from framer-motion would
      // override the tailwind classes that center the panel
      transformTemplate={({ y }) =>
        `translateX(var(--tw-translate-x)) translateY(${y})`
      }
      role="dialog"
      variants={dialogVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <DialogClose asChild>
        <CloseButton />
      </DialogClose>
      <CardHeader>
        <CardTitle>{t('Title')}</CardTitle>
        <CardDescription>
          {t('Description')}
          {env.NODE_ENV === 'development' && (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <a
              onClick={() => {
                localStorage.removeItem(WIZARD_LOCAL_STORAGE_KEY);
              }}
            >
              &nbsp; Dev mode: Reset local storage
            </a>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
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
      </CardContent>
    </MotionCard>
  );
}

/**
 * Button to be added to the main navigation, which triggers the help popover.
 * This popover allows the participant to trigger help wizards.
 */
export default function HelpButton({ id }: { id?: string }) {
  const [showWizards, toggleShowWizards] = useToggleState(false);

  const t = useTranslations('Interview.Navigation');
  return (
    <>
      <NavButtonWithTooltip
        id={id}
        title={t('Help')}
        tooltipSide="right"
        onClick={toggleShowWizards}
      >
        <HelpCircle className="h-10 w-10 stroke-[2px]" />
      </NavButtonWithTooltip>
      <ModalOverlay open={showWizards} onOpenChange={toggleShowWizards}>
        <AvailableWizardsPanel handleClosePanel={toggleShowWizards} />
      </ModalOverlay>
    </>
  );
}
