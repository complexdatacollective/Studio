'use client';

import { useRef } from 'react';
import Select from '~/components/ui/form/Select';
import { Switch } from '~/components/ui/form/Switch';
import { THEMES } from '~/lib/theme/constants';

export default function ThemeSwitcher({
  currentTheme,
  forceDarkMode,
  updateTheme,
}: {
  currentTheme: string;
  forceDarkMode: boolean;
  updateTheme: (form: FormData) => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <form action={updateTheme} ref={formRef}>
      <Select
        placeholder="Select a theme"
        name="theme"
        value={currentTheme}
        options={Object.keys(THEMES).map((theme) => ({
          label: theme,
          value: theme,
        }))}
        onValueChange={handleChange}
      />
      <Switch
        name="force-dark-mode"
        checked={forceDarkMode}
        onCheckedChange={handleChange}
      />
    </form>
  );
}
