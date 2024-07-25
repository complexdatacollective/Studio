'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type Locales, SUPPORTED_LOCALES } from '~/lib/localisation/locales';
import { usePathname, useRouter } from '~/lib/localisation/navigation';

const LanguageSwitcher = () => {
  const currentLocale = useLocale() as unknown as Locales;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('LanguageSwitcher');

  function handleLanguageChange(value: Locales) {
    router.push(pathname, { locale: value });
  }

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger>
        <SelectValue placeholder={t(currentLocale)} />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LOCALES.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {t(locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
