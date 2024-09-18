'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type Locale } from '~/lib/localisation/config';
import { setUserLocale } from '~/server/actions/locale';
import { useTransition } from 'react';

type Props = {
  defaultValue: string;
  items: { code: string; label: string }[];
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(async () => {
      await setUserLocale(locale);
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
        {items.map(({ code, label }) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
