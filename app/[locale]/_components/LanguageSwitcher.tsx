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
  type Locale,
  LOCALES_DICT as MAIN_LOCALES,
} from '~/lib/localisation/locales';
import { usePathname, useRouter } from '~/lib/localisation/navigation';
import { isInterviewRoute } from '~/lib/localisation/utils';

const LanguageSwitcher = () => {
  const currentLocale = useLocale() as unknown as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function handleLanguageChange(value: Locale) {
    router.push(pathname, { locale: value });
    router.refresh();
  }

  // TODO: replace with getting the locale options from the protocol, or as a prop or something
  const localeOptions = isInterviewRoute(pathname)
    ? [
        ['en', 'English'],
        ['fr', 'French'],
        ['es', 'Spanish'],
      ]
    : MAIN_LOCALES;

  return (
    <Select onValueChange={handleLanguageChange} value={currentLocale}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {localeOptions.map(([locale, name]) => (
          <SelectItem key={locale} value={locale}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
