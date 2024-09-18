import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { MAIN_LOCALE_OBJECTS } from '~/lib/localisation/config';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={MAIN_LOCALE_OBJECTS}
      label={t('Label')}
    />
  );
}
