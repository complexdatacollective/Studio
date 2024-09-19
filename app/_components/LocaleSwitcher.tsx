import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { BACKEND_LOCALES } from '~/lib/localisation/config';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      codes={BACKEND_LOCALES}
      label={t('Label')}
    />
  );
}
