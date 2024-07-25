'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type Locale, SUPPORTED_LOCALES } from '~/lib/localisation/locales';
import { usePathname, useRouter } from '~/lib/localisation/navigation';

const LanguageSwitcher = () => {
  const currentLocale = useLocale() as unknown as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('LanguageSwitcher');

  function handleLanguageChange(value: Locale) {
    router.push(pathname, { locale: value });
  }

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger
        className={`hover:bg-stone-100 w-[200px] space-x-1 bg-white text-xs sm:text-sm`}
      >
        <SelectValue placeholder={t(currentLocale)} />
      </SelectTrigger>
      <SelectContent className="dark:bg-slate-700 bg-white">
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
