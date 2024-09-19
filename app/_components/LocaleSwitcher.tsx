import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { type Locale } from '~/lib/localisation/config';

export default function LocaleSwitcher({ codes }: { codes: Locale[] }) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      codes={codes}
      label={t('Label')}
    />
  );
}
