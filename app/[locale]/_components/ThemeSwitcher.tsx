'use client';

import { MonitorDot, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { tv } from 'tailwind-variants';
import { useTranslations } from 'next-intl';

const variants = tv({
  slots: {
    root: 'h-12 p-1 flex items-center focus-visible:ring-ring peer shrink-0 rounded-full bg-input disabled:cursor-not-allowed disabled:opacity-50 border border overflow-hidden rounded',
    item: 'w-10 h-10 flex items-center justify-center rounded-full data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-all duration-200',
    icon: 'h-4 w-4',
  },
});

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const t = useTranslations('Components.ThemeSwitcher');

  const { root, item, icon } = variants();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <RadioGroup.Root
      className={root()}
      defaultValue={theme}
      aria-label={t('label')}
      orientation="horizontal"
      onValueChange={(value) => setTheme(value)}
    >
      <RadioGroup.Item value="system" id="system" className={item()}>
        <MonitorDot className={icon()} />
      </RadioGroup.Item>
      <RadioGroup.Item value="light" id="light" className={item()}>
        <Sun className={icon()} />
      </RadioGroup.Item>
      <RadioGroup.Item value="dark" id="dark" className={item()}>
        <Moon className={icon()} />
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}
