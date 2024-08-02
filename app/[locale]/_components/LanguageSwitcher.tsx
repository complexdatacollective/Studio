'use client';

import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type Locale, LOCALES_DICT } from '~/lib/localisation/locales';
import { usePathname, useRouter } from '~/lib/localisation/navigation';

const LanguageSwitcher = () => {
  const currentLocale = useLocale() as unknown as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function handleLanguageChange(value: Locale) {
    router.push(pathname, { locale: value });
    router.refresh();
  }

  return (
    <Select onValueChange={handleLanguageChange} value={currentLocale}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LOCALES_DICT.map(([locale, name]) => (
          <SelectItem key={locale} value={locale}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
