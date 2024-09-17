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
import { usePathname, useRouter } from 'next/navigation';
import { isInterviewRoute } from '~/lib/localisation/utils';

const LanguageSwitcher = ({
  protocolLocales,
}: {
  protocolLocales?: LocaleObject[];
}) => {
  const currentLocale = useLocale() as unknown as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function handleLanguageChange(value: Locale) {
    router.push(pathname, { locale: value });
    router.refresh();
  }

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
