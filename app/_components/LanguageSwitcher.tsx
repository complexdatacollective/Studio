'use client';

import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  type LocaleObject,
  MAIN_LOCALE_OBJECTS,
  type Locale,
} from '~/lib/localisation/locales';
import { usePathname } from 'next/navigation';
import { isInterviewRoute } from '~/lib/localisation/utils';
import { setUserLocale } from '~/server/actions/locale';

const LanguageSwitcher = ({
  protocolLocales,
}: {
  protocolLocales?: LocaleObject[];
}) => {
  const currentLocale = useLocale() as Locale;

  console.log('Current locale:', currentLocale);
  const pathname = usePathname();

  function handleLanguageChange(value: Locale) {
    void setUserLocale(value);
  }
  console.log(isInterviewRoute(pathname));

  // Combine protocol-specific locales if they are provided, or fall back to MAIN_LOCALES
  const localeOptions =
    isInterviewRoute(pathname) && protocolLocales
      ? protocolLocales.map(({ code, label }) => [code, label])
      : MAIN_LOCALE_OBJECTS.map(({ code, label }) => [code, label]);

  return (
    <Select onValueChange={handleLanguageChange} value={currentLocale}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {localeOptions.map(([code, label]) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
