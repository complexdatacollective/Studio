import { SelectTrigger } from '@radix-ui/react-select';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Select, SelectContent, SelectItem } from '~/components/select';
import { type Locale } from '~/lib/localisation/config';
import { setUserLocale } from '~/lib/localisation/locale';
import { getLocaleRecordsFromCodes } from '~/lib/localisation/utils';
import { NavButtonWithTooltip } from './NavigationButton';

export default function InterviewLocaleSwitcher({
  codes,
}: {
  codes: Locale[];
}) {
  const defaultValue = useLocale();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Interview.Navigation');

  const localeRecords = getLocaleRecordsFromCodes(codes);

  function onChange(value: Locale) {
    startTransition(async () => {
      await setUserLocale(value);
    });
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger
        aria-label={t('LanguageSwitcher')}
        asChild
        disabled={isPending}
      >
        <NavButtonWithTooltip
          tooltipContent={t('LanguageSwitcher')}
          disabled={isPending}
        >
          <Globe className="h-10 w-10 stroke-[2px]" />
        </NavButtonWithTooltip>
      </SelectTrigger>
      <SelectContent>
        {localeRecords.map(({ code, label }) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
