'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { SUPPORTED_LOCALES } from '~/lib/localisation/locales';
import { usePathname, useRouter } from '~/lib/localisation/navigation';

type Locales = (typeof SUPPORTED_LOCALES)[number];

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
      <SelectTrigger
        className={`w-[200px] space-x-1 bg-white text-xs hover:bg-stone-100 sm:text-sm`}
      >
        <SelectValue placeholder={t(currentLocale)} />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-slate-700">
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
