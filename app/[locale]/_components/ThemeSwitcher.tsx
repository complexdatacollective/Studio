'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Select from '~/components/ui/form/Select';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select
      value={theme}
      onValueChange={(theme) => setTheme(theme)}
      options={[
        { label: 'System', value: 'system' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ]}
    />
  );
}
