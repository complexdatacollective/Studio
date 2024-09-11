'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useInterviewLocale } from '~/lib/localisation/interview/Provider';

const InterviewLocaleSwitcher = () => {
  const { locale, allInterviewLocales, setLocale } = useInterviewLocale();

  return (
    <Select
      onValueChange={(newLocale) => {
        setLocale(newLocale);
      }}
      value={locale}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {allInterviewLocales.map(([locale, name]) => (
          <SelectItem key={locale} value={locale}>
            {name}
          </SelectItem>
        ))}
        <SelectItem value="DEFAULT">Default</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default InterviewLocaleSwitcher;
