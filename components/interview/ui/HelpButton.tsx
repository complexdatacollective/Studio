import { HelpCircle } from 'lucide-react';
import { NavButtonWithTooltip } from './NavigationButton';
import { useTranslations } from 'next-intl';

export default function HelpButton() {
  const t = useTranslations('Navigation');
  return (
    <>
      <NavButtonWithTooltip
        aria-label={t('help')}
        title={t('help')}
        tooltipSide="right"
      >
        <HelpCircle className="h-10 w-10 stroke-[2px]" />
      </NavButtonWithTooltip>
    </>
  );
}
