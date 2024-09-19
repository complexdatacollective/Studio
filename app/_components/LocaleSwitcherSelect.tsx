'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type Locale } from '~/lib/localisation/config';
import { useTransition } from 'react';
import { setUserLocale } from '~/lib/localisation/locale';
import { getLocaleRecordsFromCodes } from '~/lib/localisation/utils';

type Props = {
  defaultValue: string;
  codes: Locale[];
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  codes,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const localeRecords = getLocaleRecordsFromCodes(codes);

  function onChange(value: Locale) {
    startTransition(async () => {
      await setUserLocale(value);
    });
  }

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={isPending}
    >
      <SelectTrigger aria-label={label}>
        <SelectValue />
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
