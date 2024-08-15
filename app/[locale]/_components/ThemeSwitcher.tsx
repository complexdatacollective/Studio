'use client';

import { useRef } from 'react';
import Select from '~/components/ui/form/Select';
import { Switch } from '~/components/ui/form/Switch';
import { type Theme, THEMES } from '~/lib/theme/constants';

export default function ThemeSwitcher({
  cookieData,
  updateTheme,
}: {
  cookieData: { theme: Theme; forceDarkMode: boolean };
  updateTheme: (form: FormData) => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { theme, forceDarkMode } = cookieData;

  const handleChange = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <form action={updateTheme} ref={formRef}>
      <Select
        placeholder="Select a theme"
        name="theme"
        value={theme}
        options={Object.keys(THEMES).map((theme) => ({
          label: theme,
          value: theme,
        }))}
        onValueChange={handleChange}
      />
      <Switch
        name="force-dark-mode"
        defaultChecked={forceDarkMode}
        onCheckedChange={handleChange}
      />
    </form>
  );
}
